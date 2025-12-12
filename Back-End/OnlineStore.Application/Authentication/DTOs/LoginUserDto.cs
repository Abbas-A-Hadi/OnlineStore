namespace Application.Authentication.DTOs;

public sealed class LoginUserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    
    internal LoginUserDto(string email, string password)
    {
        Email = email;
        Password = password;
    }
}