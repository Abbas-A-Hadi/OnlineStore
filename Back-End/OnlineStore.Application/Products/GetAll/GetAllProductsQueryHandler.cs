using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Products;
using SharedKernel;

namespace Application.Products.GetAll;

internal sealed class GetAllProductsQueryHandler(IProductRepository repository)
    : IQueryHandler<GetAllProductsQuery, List<Product>>
{
    public async Task<Result<List<Product>>> Handle(GetAllProductsQuery query, CancellationToken cancellationToken)
    {
        List<Product> products = await repository.GetAllAsync(cancellationToken);

        if (products is { Count: < 1 })
        {
            return Result.Failure<List<Product>>(ProductErrors.NoProductFound);
        }
        
        return Result.Success(products);
    }
}