using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;
using Application.Users.LoginByRefreshToken;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Auth;

internal sealed class LoginByRefreshToken : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/login/{refreshToken}", LoginUserByRefreshTokenAsync)
            .RequireAuthorization()
            .WithTags(Tags.Users)
            .WithName("LoginByRefreshToken");
    }

    private async Task<IResult> LoginUserByRefreshTokenAsync(
        string refreshToken,
        ICommandHandler<LoginUserByRefreshTokenCommand, TokenDto> handler,
        CancellationToken cancellationToken)
    {
        LoginUserByRefreshTokenCommand command = new(refreshToken);

        Result<TokenDto> result = await handler.Handle(command, cancellationToken);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}