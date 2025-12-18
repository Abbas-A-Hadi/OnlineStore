using Application.Products.GetByCategoryPagination;
using Domain.Products;

namespace Application.Repository;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken);

    Task<List<ProductResponse>> GetByCategoryPaginationAsync(byte categoryType, int pageNumber, int pageSize, CancellationToken cancellationToken);
    
}