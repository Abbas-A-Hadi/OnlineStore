using Domain.RefreshTokens;
using Domain.Users;

namespace Infrastructure.Database.RefreshTokens;

internal static class RefreshTokenDbRowExtensions
{
    public static RefreshToken MapToRefreshToken(this RefreshTokenDbRow row)
        => RefreshToken.Restore(
            refreshTokenId: new RefreshTokenId(row.Id),
            token: row.Token,
            expirationTime: row.ExpirationTime,
            userId: new UserId(row.UserId));
}