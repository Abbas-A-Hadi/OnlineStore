using System.Data;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Database;

public interface ISqlDataAccess
{
    IDbConnection GetSqlConnection(string connectionId = "Default");
    
    Task<IEnumerable<T>> LoadData<T, U>(string sqlQuery, U parameters, 
        CancellationToken cancellationToken, string connectionId = "Default");
    
    Task<int> SaveData<T>(string storedProcedure, T parameters, 
        CancellationToken cancellationToken, string connectionId = "Default");
}