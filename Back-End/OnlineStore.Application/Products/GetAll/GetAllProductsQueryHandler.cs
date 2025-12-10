using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Products;
using SharedKernel;

namespace Application.Products.GetAll;

internal sealed class GetAllProductsQueryHandler(IProductRepository repository)
    : IQueryHandler<GetAllProductsQuery, List<ProductResponse>>
{
    public async Task<Result<List<ProductResponse>>> Handle(GetAllProductsQuery query, CancellationToken cancellationToken)
    {
        List<Product> products = await repository.GetAllAsync(cancellationToken);

        if (products is { Count: < 1 })
        {
            return Result.Failure<List<ProductResponse>>(ProductErrors.NoProductFound);
        }
        
        List<ProductResponse> productResponses = new List<ProductResponse>(products.Count);
        
        foreach (Product product in products)
        {
            productResponses.Add(new ProductResponse(
                Id: product.Id.Value,
                Name: product.Name,
                Sku: product.Sku,
                Price: product.Price,
                Currency: product.Currency,
                Reviews: product.Reviews,
                StockStatus: product.StockStatus,
                ShortDescription: product.ShortDescription,
                LongDescription: product.LongDescription,
                Features: product.Features,
                ImagePaths: product.ImagePaths));
        }
        
        return Result.Success(productResponses);
    }
}