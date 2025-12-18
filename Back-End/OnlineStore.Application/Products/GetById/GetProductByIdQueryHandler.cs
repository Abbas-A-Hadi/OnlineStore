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
            Id: product.Id.Value, 
            Name: product.Name,
            Price: product.Price,
            Currency: product.Currency.Value,
            Brand: product.Brand,
            Category: product.Category,
            ShortDescription: product.ShortDescription,
            LongDescription: product.LongDescription,
            Reviews:  product.Reviews,
            StockStatus: product.StockStatus,
            Features: product.Features,
            ImagesURLs: product.ImagesURLs);
    }
}