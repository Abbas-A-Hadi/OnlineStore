using System.Data;
using Application.Repository;
using Dapper;
using Domain.RefreshTokens;

namespace Infrastructure.Database.RefreshTokens;

public sealed class RefreshTokenRepository(ISqlDataAccess db) : IRefreshTokenRepository
{
    public async Task<bool> CreateRefreshTokenAsync(RefreshToken refreshToken, CancellationToken cancellationToken)
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        int rowsAffected = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: "spRefreshTokens_Create",
            parameters: refreshToken,
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken));
        
        return rowsAffected > 0;
    }

    public async Task<RefreshToken?> GetRefreshTokenByIdAsync(Guid refreshTokenId, CancellationToken cancellationToken)
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        RefreshTokenDbRow? row = await dbConnection.QueryFirstOrDefaultAsync<RefreshTokenDbRow?>(new CommandDefinition(
            commandText: "SELECT * FROM dbo.tvfRefreshTokens_GetById(@RefreshTokenId)",
            parameters: new { RefreshTokenId = refreshTokenId },
            commandType: CommandType.Text,
            cancellationToken: cancellationToken));

        return row?.MapToRefreshToken();
    }

    public async Task<RefreshToken?> GetRefreshTokenByTokenAsync(string token, CancellationToken cancellationToken)
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        RefreshTokenDbRow? row = await dbConnection.QueryFirstOrDefaultAsync<RefreshTokenDbRow?>(new CommandDefinition(
            commandText: "SELECT * FROM dbo.tvfRefreshTokens_GetByToken(@Token)",
            parameters: new { Token = token },
            commandType: CommandType.Text,
            cancellationToken: cancellationToken));

        return row?.MapToRefreshToken();
    }

    public async Task<bool> DeleteRefreshTokensByIdAsync(Guid refreshTokenId, CancellationToken cancellationToken)
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        int rowsAffected = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: "spRefreshTokens_DeleteById",
            parameters: new { RefreshTokenId = refreshTokenId },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken));

        return rowsAffected > 0;
    }
    
    public async Task<bool> DeleteAllRefreshTokensForUserWithIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        int rowsAffected = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: "spRefreshTokens_DeleteAllForUserWithId",
            parameters: new { UserId = userId },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken));

        return rowsAffected > 0;
    }
}