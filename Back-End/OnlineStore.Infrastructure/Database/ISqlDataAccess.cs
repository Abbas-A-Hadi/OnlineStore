using System.Data;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Database;

public interface ISqlDataAccess
{
    IDbConnection GetSqlConnection(string connectionId = "Default");
}