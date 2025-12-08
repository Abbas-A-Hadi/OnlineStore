using Application.Repository;
using Domain.Categories;
using Domain.Products;

namespace Infrastructure.Database.Products;

public sealed class ProductRepository : IProductRepository
{
    public Task<Product> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<List<Product>> GetAllAsync(CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<List<Product>> GetByCategoryAsync(CategoryTypes categoryType, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}