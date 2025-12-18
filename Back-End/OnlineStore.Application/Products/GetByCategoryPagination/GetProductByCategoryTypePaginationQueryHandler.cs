using Application.Abstractions.Messaging;
using Application.Repository;
using Domain.Categories;
using Domain.Products;
using SharedKernel;

namespace Application.Products.GetByCategoryPagination;

internal sealed class GetProductByCategoryTypePaginationQueryHandler(IProductRepository productRepository)
    : IQueryHandler<GetProductByCategoryTypePaginationQuery, List<ProductResponse>>
{
    public async Task<Result<List<ProductResponse>>> Handle(GetProductByCategoryTypePaginationQuery query, CancellationToken cancellationToken)
    {
        List<ProductResponse> products = await productRepository.GetByCategoryPaginationAsync(
                categoryType: query.CategoryType, 
                pageNumber: query.PageNumber, 
                pageSize: query.PageSize, 
                cancellationToken: cancellationToken);
        
        return products.Count is 0 
            ? Result.Failure<List<ProductResponse>>(ProductErrors.NoProductFound) 
            : Result.Success(products);
    }
}