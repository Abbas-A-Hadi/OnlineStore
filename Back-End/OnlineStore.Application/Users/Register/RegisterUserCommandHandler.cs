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
        if (await userRepository.IsUserExistsAsync(command.Email, cancellationToken))
        {
            return Result.Failure<Guid>(UserErrors.EmailNotUnique);
        }
        
        User user = User.CreateNew(
            email: command.Email,
            passwordHash: passwordHasher.Hash(command.Password),
            firstName: command.FirstName,
            lastName: command.LastName,
            dateOfBirth: command.DateOfBirth,
            role: command.Role);

        if (!await userRepository.RegisterUserAsync(user, cancellationToken))
        {
            return Result.Failure<Guid>(
                UserErrors.CreationFailure(command.Email, command.FirstName, command.LastName));
        }

        return user.Id.Value;
    }
}