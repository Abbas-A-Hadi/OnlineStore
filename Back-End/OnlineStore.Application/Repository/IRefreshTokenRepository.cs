using Domain.RefreshTokens;

namespace Application.Repository;

public interface IRefreshTokenRepository
{
    Task<bool> CreateRefreshTokenAsync(RefreshToken refreshToken, CancellationToken cancellationToken);
    
    Task<RefreshToken?> GetRefreshTokenByIdAsync(Guid refreshTokenId, CancellationToken cancellationToken);
    
    Task<RefreshToken?> GetRefreshTokenByTokenAsync(string token, CancellationToken cancellationToken);

    Task<bool> DeleteRefreshTokensByIdAsync(Guid refreshTokenId, CancellationToken cancellationToken);
    
    Task<bool> DeleteAllRefreshTokensForUserWithIdAsync(Guid userId, CancellationToken cancellationToken);
}