using System.Data;

namespace Application.Abstractions.Database;

public interface IDbTransactionOps : IDisposable
{
    void Begin(string connectionStringId = "Default");
    void Commit();
    void Rollback();
    
    IDbTransaction GetCurrentDbTransaction();

    Task<IEnumerable<T>> QueryAsync<T>(string commandText, object? parameters = null,
        int? commandTimeout = null, CommandType? commandType = null, 
        CommandFlags flags = CommandFlags.Buffered, CancellationToken cancellationToken = default);
    
    Task<T?> QueryFirstOrDefaultAsync<T>(string commandText, object? parameters = null,
        int? commandTimeout = null, CommandType? commandType = null, 
        CommandFlags flags = CommandFlags.Buffered, CancellationToken cancellationToken = default);
    
    Task<int> ExecuteAsync(string commandText, object? parameters = null,
        int? commandTimeout = null, CommandType? commandType = null, 
        CommandFlags flags = CommandFlags.Buffered, CancellationToken cancellationToken = default);
    
    Task<T?> ExecuteScalarAsync<T>(string commandText, object? parameters = null, int? commandTimeout = null,
        CommandType? commandType = null, CommandFlags flags = CommandFlags.Buffered, 
        CancellationToken cancellationToken = default);
}