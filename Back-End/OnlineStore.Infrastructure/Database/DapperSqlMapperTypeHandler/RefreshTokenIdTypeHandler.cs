using System.Data;
using Dapper;
using Domain.RefreshTokens;

namespace Infrastructure.Database.DapperSqlMapperTypeHandler;

public sealed class RefreshTokenIdTypeHandler : SqlMapper.TypeHandler<RefreshTokenId>
{
    public override void SetValue(IDbDataParameter parameter, RefreshTokenId value)
        =>  parameter.Value = value.Value;

    public override RefreshTokenId Parse(object value)
        => new RefreshTokenId((Guid)value);
}