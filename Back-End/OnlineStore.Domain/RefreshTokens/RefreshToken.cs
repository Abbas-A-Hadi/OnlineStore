using Domain.Users;

namespace Domain.RefreshTokens;

public sealed record RefreshToken
{
    public RefreshTokenId Id { get; init; }
    public string Token { get; init; }
    public DateTime ExpirationTime { get; init; }
    public UserId UserId { get; init; }
    
    internal RefreshToken(RefreshTokenId refreshTokenId, string token, DateTime expirationTime, UserId userId)
    {
        Id = refreshTokenId;
        Token = token;
        ExpirationTime = expirationTime;
        UserId = userId;
    }
}