using System.Data;

namespace Infrastructure.Database;

public interface ISqlDataAccess
{
    IDbConnection GetSqlConnection(string connectionId = "Default");
}