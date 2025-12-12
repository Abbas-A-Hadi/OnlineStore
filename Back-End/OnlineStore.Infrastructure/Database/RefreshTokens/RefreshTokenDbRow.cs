namespace Infrastructure.Database.RefreshTokens;

internal sealed class RefreshTokenDbRow
{
    public Guid Id { get; set; }
    public string Token { get; set; }
    public DateTime ExpirationTime { get; set; }
    public Guid UserId { get; set; }
}