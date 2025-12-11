using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Users;
using SharedKernel;

namespace Application.Users.UpdateById;

internal sealed class UpdateUserByIdCommandHandler(
    IUserRepository userRepository, 
    IPasswordHasher passwordHasher)
    : ICommandHandler<UpdateUserByIdCommand>
{
    public async Task<Result> Handle(UpdateUserByIdCommand command, CancellationToken cancellationToken)
    {
        string hashedPassword = passwordHasher.Hash(command.Password);
        
        User? restoredUser = await userRepository.GetUserByIdAsync(command.UserId, cancellationToken);

        if (restoredUser is null)
        {
            return Result.Failure(UserErrors.NotFound(command.UserId));
        }
        
        User updatedUser = restoredUser with
        {
            Email = command.Email,
            PasswordHash = hashedPassword,
            FirstName = command.FirstName,
            LastName = command.LastName,
            DateOfBirth = command.DateOfBirth
        };
        
        return await userRepository.UpdateUserAsync(updatedUser, cancellationToken)
            ? Result.Success()
            : Result.Failure(UserErrors.UpdateFailure(restoredUser.Id.Value, restoredUser.Email));
    }
}