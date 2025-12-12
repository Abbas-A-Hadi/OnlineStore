namespace Application.Authentication.DTOs;

public sealed class TokenDto
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
}