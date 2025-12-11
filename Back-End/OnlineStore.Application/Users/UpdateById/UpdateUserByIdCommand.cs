using Application.Abstractions.Messaging;

namespace Application.Users.UpdateById;

public sealed record UpdateUserByIdCommand(Guid UserId, string Email, string Password, 
    string FirstName, string LastName, DateOnly DateOfBirth) : ICommand;