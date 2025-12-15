namespace Application.Authentication.DTOs;

public sealed class RegisterUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public DateOnly DateOfBirth { get; init; }
    public string Role { get; init; }
    
    public RegisterUserDto(string email, string password, string firstName, string lastName, DateOnly dateOfBirth, string role)
    {
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Role = role;
    }
}