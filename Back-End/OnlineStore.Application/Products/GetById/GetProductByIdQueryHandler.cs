using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Products;
using SharedKernel;

namespace Application.Products.GetById;

public sealed class GetProductByIdQueryHandler(IProductRepository productRepository) 
    : IQueryHandler<GetProductByIdQuery, ProductResponse>
{
    public async Task<Result<ProductResponse>> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        Product? product = await productRepository.GetByIdAsync(query.ProductId, cancellationToken);

        if (product is null)
        {
            return Result.Failure<ProductResponse>(ProductErrors.NotFound(query.ProductId));
        }
        
        return new ProductResponse(
            Id: query.ProductId, 
            Name: product.Name,
            Sku: product.Sku,
            Price: product.Price,
            Currency: product.Currency,
            StockStatus: product.StockStatus,
            Reviews:  product.Reviews,
            ShortDescription: product.ShortDescription,
            LongDescription: product.LongDescription,
            Features: product.Features,
            ImagePaths: product.ImagePaths);
    }
}