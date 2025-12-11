using Application.Abstractions.Messaging;
using Application.Users.Register;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Users;

public sealed class Register : IEndpoint
{
    public sealed record RegisterUserRequest(string Email, string Password, string FirstName, string LastName, DateOnly DateOfBirth, string Role);
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("users/register", RegisterUserAsync)
            .WithTags(Tags.Users)
            .WithName("RegisterUser");
    }
    
    private async Task<IResult> RegisterUserAsync(
        RegisterUserRequest request,
        ICommandHandler<RegisterUserCommand, Guid> handler,
        CancellationToken cancellationToken) 
    {
        RegisterUserCommand command = new (
            Email: request.Email,
            Password: request.Password,
            FirstName: request.FirstName,
            LastName: request.LastName,
            DateOfBirth: request.DateOfBirth,
            Role: request.Role);
                
        Result<Guid> result = await handler.Handle(command, cancellationToken);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}