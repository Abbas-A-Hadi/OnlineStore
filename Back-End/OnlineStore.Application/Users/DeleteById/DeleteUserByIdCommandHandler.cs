using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Users;
using SharedKernel;

namespace Application.Users.DeleteById;

internal sealed record DeleteUserByIdCommandHandler(IUserRepository UserRepository)
    : ICommandHandler<DeleteUserByIdCommand>
{
    public async Task<Result> Handle(DeleteUserByIdCommand command, CancellationToken cancellationToken)
    {
        if (!await UserRepository.IsUserExistsAsync(command.UserId, cancellationToken))
        {
            return Result.Failure(UserErrors.NotFound(command.UserId));
        }
        
        return await UserRepository.DeleteUserAsync(command.UserId, cancellationToken)
            ? Result.Success() 
            : Result.Failure(UserErrors.FailedToDelete(command.UserId)); 
    }
}