using Application.Abstractions.Messaging;
using Application.Users.GetById;
using Application.Users.Register;
using Domain.Users;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Users;

public sealed class Register : IEndpoint
{
    public sealed record Request(string Email, string Password, string FirstName, string LastName, DateOnly DateOfBirth);
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("users/register", async (
            Request request,
            ICommandHandler<RegisterUserCommand, Guid> handler,
            CancellationToken cancellationToken) =>
            {
                RegisterUserCommand command = new (
                    Email: request.Email,
                    FirstName: request.FirstName,
                    LastName: request.LastName,
                    Password: request.Password,
                    BirthOfDate: request.DateOfBirth);
                
               Result<Guid> result = await handler.Handle(command, cancellationToken);

               return result.Match(Results.Ok, CustomResults.Problem);
            })
            .WithTags(Tags.Users);
    }
}