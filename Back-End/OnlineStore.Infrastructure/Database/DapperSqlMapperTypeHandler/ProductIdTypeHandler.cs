using System.Data;
using Dapper;
using Domain.Products;

namespace Infrastructure.Database.DapperSqlMapperTypeHandler;

public sealed class ProductIdTypeHandler : SqlMapper.TypeHandler<ProductId>
{
    public override void SetValue(IDbDataParameter parameter, ProductId value)
        =>  parameter.Value = value.Value;

    public override ProductId Parse(object value)
        => new ProductId((int)value);
}