using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Products;
using SharedKernel;

namespace Application.Products.GetByCategory;

internal sealed class GetProductByCategoryTypeQueryHandler(IProductRepository productRepository)
    : IQueryHandler<GetProductByCategoryTypeQuery, List<Product>>
{
    public async Task<Result<List<Product>>> Handle(GetProductByCategoryTypeQuery query, CancellationToken cancellationToken)
    {
        List<Product> products = 
            await productRepository.GetByCategoryAsync(query.CategoryType, cancellationToken);

        return products is { Count: < 1 } 
            ? Result.Failure<List<Product>>(ProductErrors.NoProductFound) 
            : Result.Success(products);
    }
}