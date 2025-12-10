namespace Application.Authentication;

public sealed class RefreshTokenDto
{
    public Guid UserId { get; set; }
    public required string RefreshToken { get; set; }
}