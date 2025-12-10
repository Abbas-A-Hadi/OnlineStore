using Application.Abstractions.Authentication;
using Application.Authentication;
using Application.Repository;
using Domain.Users;
using Microsoft.Extensions.Configuration;
using SharedKernel;

namespace Infrastructure.Authentication;

internal sealed class AuthService(
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    ITokenProvider tokenProvider,
    IRefreshTokenProvider refreshTokenProvider,
    IDateTimeProvider dateTimeProvider) 
    : IAuthService
{
    public async Task<Result<User>> RegisterAsync(UserDto userDto, CancellationToken cancellationToken)
    {
        string hashedPassword = passwordHasher.Hash(userDto.Password);
        
        if (await userRepository.IsUserExistsAsync(userDto.Email, hashedPassword, cancellationToken))
            return Result.Failure<User>(UserErrors.EmailNotUnique);

        User user = User.CreateNew(
            email: userDto.Email,
            passwordHash: hashedPassword,
            firstName: userDto.FirstName,
            lastName: userDto.LastName,
            dateOfBirth: userDto.DateOfBirth);

        if (!await userRepository.RegisterUserAsync(user, cancellationToken))
            return Result.Failure<User>(
                UserErrors.CreationConflict(userDto.Email, userDto.FirstName, userDto.LastName));

        return user;
    }

    public async Task<Result<TokenDto>> LoginAsync(UserDto userDto, CancellationToken cancellationToken)
    {
        User? user = await userRepository.GetUserByEmailAsync(userDto.Email, cancellationToken);

        if (user is null)
            return Result.Failure<TokenDto>(UserErrors.NotFoundByEmail);

        if (!passwordHasher.Verify(userDto.Password, user.PasswordHash))
            return Result.Failure<TokenDto>(UserErrors.NotFoundByEmail);

        string token = tokenProvider.Create(user);
        string refreshToken = refreshTokenProvider.Create(user);

        User updatedUser = user with
        {
            RefreshToken = user.RefreshToken ?? refreshToken,
            RefreshTokenExpirationTime = 
                user.RefreshTokenExpirationTime is not null && 
                user.RefreshTokenExpirationTime.Value <= dateTimeProvider.UtcNow
                    ? dateTimeProvider.UtcNow.AddDays(7)
                    : user.RefreshTokenExpirationTime
        };
        
        await userRepository.UpdateUserAsync(updatedUser, cancellationToken);
        
        return new TokenDto()
        {
            AccessToken = token,
            RefreshToken = refreshToken
        };
    }

    public async Task<Result<TokenDto>> RefreshTokensAsync(RefreshTokenDto refreshTokenDto, CancellationToken cancellationToken)
    {
        User? user = await userRepository.GetUserByIdAsync(refreshTokenDto.UserId, cancellationToken);
        
        if (user is null)
            return Result.Failure<TokenDto>(UserErrors.NotFound(refreshTokenDto.UserId));

        string accessToken = tokenProvider.Create(user);
        string refreshToken = refreshTokenProvider.Create(user);

        User updatedUser = user with
        {
            RefreshToken = refreshToken,
            RefreshTokenExpirationTime = dateTimeProvider.UtcNow.AddDays(7)
        };

        if (!await userRepository.UpdateUserAsync(updatedUser, cancellationToken))
            return Result.Failure<TokenDto>(UserErrors.UpdateFailure(user.Id.Value, user.Email));

        return new TokenDto()
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }
}