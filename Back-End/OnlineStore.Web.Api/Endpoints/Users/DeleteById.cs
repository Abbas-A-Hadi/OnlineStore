using Application.Abstractions.Messaging;
using Application.Users.DeleteById;
using Domain.Users;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Users;

internal sealed class DeleteById : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapDelete("users/{userId:guid}", DeleteByUserIdAsync)
            .WithTags(Tags.Users)
            .WithName("DeleteUserById");
    }
    
    private async Task<IResult> DeleteByUserIdAsync(
        Guid userId, 
        ICommandHandler<DeleteUserByIdCommand> handler,
        CancellationToken cancellationToken)
    {
        DeleteUserByIdCommand command = new(userId);
                
        Result result = await handler.Handle(command, cancellationToken);
                
        return result.Match(Results.NoContent, CustomResults.Problem);
    }
}