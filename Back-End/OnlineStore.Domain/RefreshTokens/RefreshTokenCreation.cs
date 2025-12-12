using Domain.Users;

namespace Domain.RefreshTokens;

public static class RefreshTokenCreation
{
    extension(RefreshToken)
    {
        public static RefreshToken CreateNew(string token, DateTime expirationTime, UserId userId)
            => new RefreshToken(
                refreshTokenId: new RefreshTokenId(Guid.NewGuid()),
                token: token,
                expirationTime: expirationTime,
                userId: userId
            );
        
        public static RefreshToken Restore(RefreshTokenId refreshTokenId, string token, DateTime expirationTime, UserId userId)
            => new RefreshToken(
                refreshTokenId: refreshTokenId,
                token: token,
                expirationTime: expirationTime,
                userId: userId
            );
    }
}