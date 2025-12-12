using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.RefreshTokens;
using Domain.Users;
using SharedKernel;

namespace Application.Users.RevokeRefreshTokens;

internal sealed class RevokeRefreshTokensCommandHandler(
    IRefreshTokenRepository refreshTokenRepository, 
    IUserContext userContext) 
    : ICommandHandler<RevokeRefreshTokensCommand>
{
    public async Task<Result> Handle(RevokeRefreshTokensCommand command, CancellationToken cancellationToken)
    {
        if (command.UserId != userContext.UserId)
        {
            return Result.Failure(UserErrors.Unauthorized());
        }

        return await refreshTokenRepository
            .DeleteAllRefreshTokensForUserWithIdAsync(command.UserId, cancellationToken)
            ? Result.Success()
            : Result.Failure(RefreshTokenErrors.DeletionFailure(command.UserId));
    }
}