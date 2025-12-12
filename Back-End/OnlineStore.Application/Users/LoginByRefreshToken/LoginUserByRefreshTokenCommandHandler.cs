using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;
using Application.Repository;
using Domain.RefreshTokens;
using Domain.Users;
using SharedKernel;

namespace Application.Users.LoginByRefreshToken;

internal sealed class LoginUserByRefreshTokenCommandHandler(
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository,
    ITokenProvider tokenProvider,
    IRefreshTokenProvider refreshTokenProvider) 
    : ICommandHandler<LoginUserByRefreshTokenCommand, TokenDto>
{
    public async Task<Result<TokenDto>> Handle(LoginUserByRefreshTokenCommand command, CancellationToken cancellationToken)
    {
        RefreshToken? restoredRefreshToken = await refreshTokenRepository
            .GetRefreshTokenByTokenAsync(command.RefreshToken, cancellationToken);

        if (restoredRefreshToken is null)
        {
            return Result.Failure<TokenDto>(RefreshTokenErrors.NotFound(command.RefreshToken));
        }
        
        User? restoredUser = await userRepository.GetUserByIdAsync(restoredRefreshToken.UserId.Value, cancellationToken);
        
        if (restoredUser is null)
        {
            return Result.Failure<TokenDto>(UserErrors.NotFound(restoredRefreshToken.UserId.Value));
        }

        string token = tokenProvider.Create(restoredUser);

        RefreshToken newRefreshToken = RefreshToken.CreateNew(
            token: refreshTokenProvider.Create(restoredUser),
            expirationTime: DateTime.UtcNow.AddDays(7),
            userId: restoredRefreshToken.UserId);

        if (!await refreshTokenRepository.CreateRefreshTokenAsync(newRefreshToken, cancellationToken))
        {
            return Result.Failure<TokenDto>(RefreshTokenErrors.CreationFailure(newRefreshToken.Token));
        }

        return new TokenDto()
        {
            AccessToken = token,
            RefreshToken = newRefreshToken.Token,
        };
    }
}