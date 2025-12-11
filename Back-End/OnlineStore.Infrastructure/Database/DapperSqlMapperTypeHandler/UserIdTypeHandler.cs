using System.Data;
using Dapper;
using Domain.Users;

namespace Infrastructure.Database.DapperSqlMapperTypeHandler;

public sealed class UserIdTypeHandler : SqlMapper.TypeHandler<UserId>
{
    public override void SetValue(IDbDataParameter parameter, UserId value)
        =>  parameter.Value = value.Value;

    public override UserId Parse(object value)
        => new UserId((Guid)value);
}