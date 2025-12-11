using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Database;

public sealed class SqlDataAccess(IConfiguration configuration) : ISqlDataAccess
{
    public IDbConnection GetSqlConnection(string connectionId = "Default")
    {
        return new SqlConnection(configuration.GetConnectionString(connectionId));
    }
}