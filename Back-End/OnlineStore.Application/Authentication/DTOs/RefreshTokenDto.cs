namespace Application.Authentication.DTOs;

public sealed class RefreshTokenDto
{
    public Guid UserId { get; set; }
    public required string RefreshToken { get; set; }
}