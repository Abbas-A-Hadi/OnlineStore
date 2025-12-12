using Application.Abstractions.Messaging;
using Application.Users.UpdateById;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Users;

internal sealed class UpdateById : IEndpoint
{
    public sealed record UpdateUserRequest(string Email, string Password, string FirstName, string LastName, DateOnly DateOfBirth);
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("users/{userId:guid}", UpdateUserByIdAsync)
            .RequireAuthorization()
            .WithTags(Tags.Users)
            .WithName("UpdateUserById");
    }
    
    private async Task<IResult> UpdateUserByIdAsync(
        Guid userId,
        UpdateUserRequest request,
        ICommandHandler<UpdateUserByIdCommand> handler,
        CancellationToken cancellationToken) 
    {
        UpdateUserByIdCommand command = new(
            UserId: userId,
            Email: request.Email,
            Password: request.Password,
            FirstName: request.FirstName,
            LastName: request.LastName,
            DateOfBirth: request.DateOfBirth);
                
        Result result = await handler.Handle(command, cancellationToken);

        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}