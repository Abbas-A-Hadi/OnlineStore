using Domain.Users;

namespace Application.Users.Register;

public sealed class RegisterUserResponse
{
    public Guid UserId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public DateOnly DateOfBirth { get; init; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}