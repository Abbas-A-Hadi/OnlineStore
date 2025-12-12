using Application.Abstractions.Authentication;
using Application.Repository;
using Application.Authentication.DTOs;
using Domain.RefreshTokens;
using Domain.Users;
using SharedKernel;

namespace Infrastructure.Authentication;

internal sealed class AuthService(
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository,
    IPasswordHasher passwordHasher,
    ITokenProvider tokenProvider,
    IRefreshTokenProvider refreshTokenProvider,
    IDateTimeProvider dateTimeProvider) 
    : IAuthService
{
    public async Task<Result<User>> RegisterUserAsync(RegisterUserDto registerUserDto, CancellationToken cancellationToken)
    {
        if (await userRepository.IsUserExistsAsync(registerUserDto.Email, cancellationToken))
        {
            return Result.Failure<User>(UserErrors.EmailNotUnique);
        }

        User user = User.CreateNew(
            email: registerUserDto.Email,
            passwordHash: passwordHasher.Hash(registerUserDto.Password),
            firstName: registerUserDto.FirstName,
            lastName: registerUserDto.LastName,
            dateOfBirth: registerUserDto.DateOfBirth);

        if (!await userRepository.RegisterUserAsync(user, cancellationToken))
        {
            return Result.Failure<User>(UserErrors
                .CreationFailure(registerUserDto.Email, registerUserDto.FirstName, registerUserDto.LastName));
        }

        return user;
    }

    public async Task<Result<TokenDto>> LoginUserAsync(LoginUserDto loginUserDto, CancellationToken cancellationToken)
    {
        User? restoredUser = await userRepository.GetUserByEmailAsync(loginUserDto.Email, cancellationToken);

        if (restoredUser is null)
        {
            return Result.Failure<TokenDto>(UserErrors.NotFoundByEmail);
        }

        if (!passwordHasher.Verify(loginUserDto.Password, restoredUser.PasswordHash))
        {
            return Result.Failure<TokenDto>(UserErrors.NotFoundByEmail);
        }

        string token = tokenProvider.Create(restoredUser);

        RefreshToken refreshToken = RefreshToken.CreateNew(
            token: refreshTokenProvider.Create(restoredUser),
            expirationTime: DateTime.UtcNow.AddDays(7),
            userId: restoredUser.Id);
        
        if (!await refreshTokenRepository.CreateRefreshTokenAsync(refreshToken, cancellationToken))
        {
            return Result.Failure<TokenDto>(RefreshTokenErrors
                .CreationFailure(refreshToken.Token));
        }
        
        return new TokenDto()
        {
            AccessToken = token,
            RefreshToken = refreshToken.Token
        };
    }

    public async Task<Result<TokenDto>> RefreshTokensAsync(RefreshTokenDto refreshTokenDto, CancellationToken cancellationToken)
    {
        User? restoredUser = await userRepository.GetUserByIdAsync(refreshTokenDto.UserId, cancellationToken);
        
        if (restoredUser is null)
        {
            return Result.Failure<TokenDto>(UserErrors.NotFound(refreshTokenDto.UserId));
        }

        string accessToken = tokenProvider.Create(restoredUser);

        RefreshToken refreshToken = RefreshToken.CreateNew(
            token: refreshTokenProvider.Create(restoredUser),
            expirationTime: dateTimeProvider.UtcNow.AddDays(7),
            userId: restoredUser.Id
        );

        if (!await refreshTokenRepository.CreateRefreshTokenAsync(refreshToken, cancellationToken))
        {
            return Result.Failure<TokenDto>(RefreshTokenErrors
                .CreationFailure(refreshToken.Token));
        }

        return new TokenDto()
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        };
    }
}