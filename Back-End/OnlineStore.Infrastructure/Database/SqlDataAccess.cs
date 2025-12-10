using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Database;

public sealed class SqlDataAccess : ISqlDataAccess
{
    private readonly IConfiguration  _config;
    
    public SqlDataAccess(IConfiguration config) => _config = config;

    public IDbConnection GetSqlConnection(string connectionId = "Default")
    {
        return new SqlConnection(_config.GetConnectionString(connectionId));
    }

    public async Task<IEnumerable<T>> LoadData<T, U>(string sqlQuery, U parameters, CancellationToken cancellationToken, string connectionId = "Default")
    {
        using IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString(connectionId));
        
        return await dbConnection.QueryAsync<T>(
            new CommandDefinition(sqlQuery, parameters, commandType: CommandType.Text, cancellationToken: cancellationToken));
    }

    public async Task<int> SaveData<T>(string storedProcedure, T parameters, CancellationToken cancellationToken, string connectionId = "Default")
    {
        using IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString(connectionId));

        return await dbConnection.ExecuteAsync(
            new CommandDefinition(storedProcedure, parameters, 
                commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken));
    }
}