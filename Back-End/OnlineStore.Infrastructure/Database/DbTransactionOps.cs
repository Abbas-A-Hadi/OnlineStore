using System.Data;
using Application.Abstractions.Database;
using Dapper;
using CommandFlags = Application.Abstractions.Database.CommandFlags;

namespace Infrastructure.Database;

public sealed class DbTransactionOps(ISqlDataAccess sqlDataAccess) : IDbTransactionOps
{
    private IDbConnection _connection;
    private IDbTransaction _transaction;
    
    public void Begin(string connectionStringId = "Default")
    {
        _connection = sqlDataAccess.GetSqlConnection(connectionStringId);
        
        _connection.Open();
        _transaction = _connection.BeginTransaction();
    }
    
    public void Commit()
    {
        _transaction?.Commit();
        _connection?.Close();
    }

    public void Rollback()
    {
        _transaction?.Rollback();
        _connection?.Close();
    }

    public void Dispose() 
    {
        _transaction?.Dispose();
        _connection?.Close();
    }

    public IDbTransaction GetCurrentDbTransaction()
    {
        return _transaction;
    }
    
    public async Task<T?> ExecuteScalarAsync<T>(string commandText, object? parameters = null, 
        int? commandTimeout = null, CommandType? commandType = null, CommandFlags flags = CommandFlags.Buffered
        , CancellationToken cancellationToken = default)
    {
        CommandDefinition command = new (commandText: commandText, parameters: parameters, 
            transaction: _transaction, commandTimeout: commandTimeout, commandType: commandType, 
            flags: GetDapperCommandFlags(flags), cancellationToken: cancellationToken);
        
        return await _connection.ExecuteScalarAsync<T?>(command);
    }

    public async Task<int> ExecuteAsync(string commandText, object? parameters = null, 
        int? commandTimeout = null, CommandType? commandType = null, 
        CommandFlags flags = CommandFlags.Buffered, CancellationToken cancellationToken = default)
    {
        CommandDefinition command = new (commandText: commandText, parameters: parameters, 
            transaction: _transaction, commandTimeout: commandTimeout, commandType: commandType, 
            flags: GetDapperCommandFlags(flags), cancellationToken: cancellationToken);
        
        return await _connection.ExecuteAsync(command);
    }

    public async Task<IEnumerable<T>> QueryAsync<T>(string commandText, object? parameters = null,
        int? commandTimeout = null, CommandType? commandType = null, 
        CommandFlags flags = CommandFlags.Buffered, CancellationToken cancellationToken = default) 
    {
        CommandDefinition command = new (commandText: commandText, parameters: parameters, 
            transaction: _transaction, commandTimeout: commandTimeout, commandType: commandType, 
            flags: GetDapperCommandFlags(flags), cancellationToken: cancellationToken);
        
        return await _connection.QueryAsync<T>(command);
    }
    
    public async Task<T?> QueryFirstOrDefaultAsync<T>(string commandText, object? parameters = null,
        int? commandTimeout = null, CommandType? commandType = null, 
        CommandFlags flags = CommandFlags.Buffered, CancellationToken cancellationToken = default) 
    {
        CommandDefinition command = new (commandText: commandText, parameters: parameters, 
            transaction: _transaction, commandTimeout: commandTimeout, commandType: commandType, 
            flags: GetDapperCommandFlags(flags), cancellationToken: cancellationToken);
        
        return await _connection.QueryFirstOrDefaultAsync<T>(command);
    }

    
    private Dapper.CommandFlags GetDapperCommandFlags(CommandFlags flags)
        => flags switch
        {
            CommandFlags.Buffered => Dapper.CommandFlags.Buffered,
            CommandFlags.Pipelined => Dapper.CommandFlags.Pipelined,
            CommandFlags.NoCache => Dapper.CommandFlags.NoCache,
            
            CommandFlags.Buffered | CommandFlags.Pipelined 
                => Dapper.CommandFlags.Buffered | Dapper.CommandFlags.Pipelined,
            CommandFlags.Buffered | CommandFlags.NoCache 
                => Dapper.CommandFlags.Buffered | Dapper.CommandFlags.NoCache,
            CommandFlags.Pipelined | CommandFlags.NoCache
                => Dapper.CommandFlags.Pipelined | Dapper.CommandFlags.NoCache,
            
            CommandFlags.Buffered | CommandFlags.Pipelined | CommandFlags.NoCache
                => Dapper.CommandFlags.Buffered | Dapper.CommandFlags.Pipelined | Dapper.CommandFlags.NoCache,
            
            _  => Dapper.CommandFlags.None
        };
}