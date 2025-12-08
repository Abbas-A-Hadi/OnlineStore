using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Users;
using SharedKernel;

namespace Application.Users.Register;

internal sealed class RegisterUserCommandHandler(IUserRepository userRepository, IPasswordHasher passwordHasher) 
    : ICommandHandler<RegisterUserCommand, Guid>
{
    public async Task<Result<Guid>> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        string passwordHashed = passwordHasher.Hash(command.Password);
        
        if (await userRepository.IsUserExistsAsync(command.Email, passwordHashed, cancellationToken))
        {
            return Result.Failure<Guid>(UserErrors.EmailNotUnique);
        }
        
        User? user = User.CreateNew(
            email: command.Email,
            firstName: command.FirstName,
            lastName: command.LastName,
            passwordHash: passwordHashed);

        if (user is null)
        {
            return Result.Failure<Guid>(
                UserErrors.CreationConflict(command.Email, command.FirstName, command.LastName));
        }

        bool isUserCreated = await userRepository.CreateUserAsync(user, cancellationToken);

        if (!isUserCreated)
        {
            return Result.Failure<Guid>(
                UserErrors.CreationConflict(command.Email, command.FirstName, command.LastName));
        }

        return user.Id.Value;
    }
}