using System.Data;
using Application.Products.GetByCategoryPagination;
using Application.Repository;
using Dapper;
using Domain.Products;

namespace Infrastructure.Database.Products;

public sealed class ProductRepository(ISqlDataAccess db) : IProductRepository
{
    public async Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        using IDbConnection connection = db.GetSqlConnection();

        ProductDbRow? row = await connection.QueryFirstOrDefaultAsync<ProductDbRow>(new CommandDefinition(
            commandText: "SELECT * FROM dbo.tvfProducts_GetById(@ProductId)",
            parameters: new { ProductId = id},
            commandType: CommandType.Text,
            cancellationToken: cancellationToken));

        return row?.MapToProduct();
    }

    public async Task<List<ProductResponse>> GetByCategoryPaginationAsync(byte categoryType, int pageNumber, int pageSize, CancellationToken cancellationToken)
    {
        using IDbConnection connection = db.GetSqlConnection();

        IEnumerable<ProductDbRow> rows = await connection.QueryAsync<ProductDbRow>(new CommandDefinition(
            commandText: "SELECT * FROM dbo.tvfProducts_GetByCategoryIdPagination(@CategoryId, @PageNumber, @NumberOfRecords)",
            parameters: new
            {
                CategoryId = categoryType,
                PageNumber = pageNumber,
                NumberOfRecords = pageSize,
            },
            commandType: CommandType.Text,
            cancellationToken: cancellationToken));

        List<ProductResponse> products = new (capacity: pageSize);
        
        foreach (ProductDbRow row in rows)
        {
            products.Add(row.MapToProductResponse());
        }

        return products;
    }
}