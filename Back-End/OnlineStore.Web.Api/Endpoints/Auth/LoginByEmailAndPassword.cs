using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;
using Application.Users.LoginByEmailAndPassword;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Auth;

internal sealed class LoginByEmailAndPassword : IEndpoint
{
    public sealed record LoginUserByEmailAndPasswordRequest(string Email, string Password);
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/login/", LoginUserByEmailAndPasswordAsync)
            .WithTags(Tags.Users)
            .WithName("LoginUserByEmailAndPassword");
    }
    
    private async Task<IResult> LoginUserByEmailAndPasswordAsync(
        LoginUserByEmailAndPasswordRequest request,
        ICommandHandler<LoginUserCommand, TokenDto> handler,
        CancellationToken cancellationToken)
    {
        LoginUserCommand command = new(request.Email, request.Password);

        Result<TokenDto> result = await handler.Handle(command, cancellationToken);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}