using System.Data;
using System.Diagnostics;
using Application.Repository;
using Dapper;
using Domain.Users;
using Microsoft.Data.SqlClient;

namespace Infrastructure.Database.Users;

public sealed class UserRepository(ISqlDataAccess db) : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken) 
    {
        IEnumerable<User> users = await db.LoadData<User, Guid>(
            sqlQuery: "SELECT * FROM ", 
            parameters: userId, 
            cancellationToken);
        
        return users.FirstOrDefault();
    }
    
    public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        IEnumerable<User> users = await db.LoadData<User, string>(
            sqlQuery: "SELECT * FROM ",
            parameters: email,
            cancellationToken);
        
        return users.FirstOrDefault();
    }
    
    public async Task<bool> IsUserExistsAsync(Guid userId, CancellationToken cancellationToken)
    {
        string storedProcedure = "spUsers_IsExists_ById";

        using IDbConnection dbConnection = db.GetSqlConnection();

        CommandDefinition commandDefinition = new CommandDefinition(
            commandText: storedProcedure,
            parameters: new { UserId = userId },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);
        
        return await dbConnection.ExecuteAsync(commandDefinition) > 0;
    }
    
    public async Task<bool> IsUserExistsAsync(string email, string passwordHash, CancellationToken cancellationToken) 
    {
        string storedProcedure = "spUsers_IsExists_ByEmailAndPassword";

        using IDbConnection dbConnection = db.GetSqlConnection();

        CommandDefinition commandDefinition = new CommandDefinition(
            commandText: storedProcedure,
            parameters: new { Email = email, PasswordHash = passwordHash },
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);
        
        return await dbConnection.ExecuteAsync(commandDefinition) > 0;
    }
    
    public async Task<bool> RegisterUserAsync(User user, CancellationToken cancellationToken) 
    {
        int rowsAffected = await db.SaveData<User>(
            storedProcedure: "spUsers_Create",
            parameters: user,
            cancellationToken);

        return rowsAffected > 0;
    }
    
    public async Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken) 
    {
        int rowsAffected = await db.SaveData<User>(
            storedProcedure: "spUsers_Update",
            parameters: user,
            cancellationToken);

        return rowsAffected > 0;
    }
    
    public async Task<bool> DeleteUserAsync(Guid userId, CancellationToken cancellationToken) 
    {
        int rowsAffected = await db.SaveData<Guid>(
            storedProcedure: "spUsers_Delete_ById",
            parameters: userId,
            cancellationToken);

        return rowsAffected > 0;
    }
}