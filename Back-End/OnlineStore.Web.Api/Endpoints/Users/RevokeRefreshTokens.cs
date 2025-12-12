using Application.Abstractions.Messaging;
using Application.Users.RevokeRefreshTokens;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Users;

public class RevokeRefreshTokens : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/users/{userId:guid}/refresh-token", RevokeRefreshTokensAsync)
            .RequireAuthorization()
            .HasPermission(Permissions.UsersAccess)
            .WithTags(Tags.Users)
            .WithName("RevokeRefreshTokens");
    }

    private async Task<IResult> RevokeRefreshTokensAsync(
        Guid userId,
        ICommandHandler<RevokeRefreshTokensCommand> handler,
        CancellationToken cancellationToken)
    {
        RevokeRefreshTokensCommand command = new(UserId: userId);

        Result result = await handler.Handle(command, cancellationToken);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}