using System.Data;
using Application.Repository;
using Dapper;
using Domain.Users;

namespace Infrastructure.Database.Users;

public sealed class UserRepository(ISqlDataAccess db) : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken) 
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        UserDbRow? row = await dbConnection.QueryFirstOrDefaultAsync<UserDbRow>(new CommandDefinition(
            commandText: "SELECT * FROM dbo.tvfUsers_GetById(@userId)",
            parameters: new { UserId = userId }, commandType: CommandType.Text,
            cancellationToken: cancellationToken));
        
         return row?.MapToUser();
    }
    
    public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        using IDbConnection dbConnection = db.GetSqlConnection();

        UserDbRow? row = await dbConnection.QueryFirstOrDefaultAsync<UserDbRow>(new CommandDefinition(
            commandText: "SELECT * FROM dbo.tvfUsers_GetByEmail(@email)",
            parameters: new { Email = email }, commandType: CommandType.Text,
            cancellationToken: cancellationToken));
        
        return row?.MapToUser();
    }
    
    public async Task<bool> IsUserExistsAsync(Guid userId, CancellationToken cancellationToken)
    {
        string storedProcedure = "spUsers_IsExists_ById";

        using IDbConnection dbConnection = db.GetSqlConnection();

        int isFoundAsInt = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: storedProcedure,
            parameters: new { UserId = userId },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken));

        return isFoundAsInt is 1;
    }
    
    public async Task<bool> IsUserExistsAsync(string email, CancellationToken cancellationToken) 
    {
        string storedProcedure = "spUsers_IsExists_ByEmailOnly";

        using IDbConnection dbConnection = db.GetSqlConnection();

        int isFoundAsInt = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: storedProcedure,
            parameters: new { Email = email },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken));

        return isFoundAsInt is 1;
    }
    
    public async Task<bool> IsUserExistsAsync(string email, string passwordHash, CancellationToken cancellationToken) 
    {
        string storedProcedure = "spUsers_IsExists_ByEmailAndPassword";

        using IDbConnection dbConnection = db.GetSqlConnection();

        int isFoundAsInt = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: storedProcedure,
            parameters: new { Email = email, PasswordHash = passwordHash },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken));

        return isFoundAsInt is 1;
    }
    
    public async Task<bool> RegisterUserAsync(User user, CancellationToken cancellationToken) 
    {
        using IDbConnection dbConnection = db.GetSqlConnection();
        
        int rowsAffected = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: "spUsers_Create", parameters: user, 
            commandType: CommandType.StoredProcedure, 
            cancellationToken: cancellationToken)); 

        return rowsAffected > 0;
    }
    
    public async Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken) 
    {
        using IDbConnection dbConnection = db.GetSqlConnection();
        
        int rowsAffected = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: "spUsers_Update", parameters: user, 
            commandType: CommandType.StoredProcedure, 
            cancellationToken: cancellationToken)); 

        return rowsAffected > 0;
    }
    
    public async Task<bool> DeleteUserAsync(Guid userId, CancellationToken cancellationToken) 
    {
        using IDbConnection dbConnection = db.GetSqlConnection();
        
        int rowsAffected = await dbConnection.ExecuteScalarAsync<int>(new CommandDefinition(
            commandText: "spUsers_Delete_ById", parameters: new { UserId = userId }, 
            commandType: CommandType.StoredProcedure, 
            cancellationToken: cancellationToken)); 

        return rowsAffected > 0;
    }
}