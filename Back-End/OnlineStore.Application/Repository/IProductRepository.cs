using Domain.Categories;
using Domain.Products;

namespace Application.Repository;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

    Task<List<Product>> GetAllAsync(CancellationToken cancellationToken);
    
    Task<List<Product>> GetByCategoryAsync(CategoryTypes categoryType, CancellationToken cancellationToken);
    
}