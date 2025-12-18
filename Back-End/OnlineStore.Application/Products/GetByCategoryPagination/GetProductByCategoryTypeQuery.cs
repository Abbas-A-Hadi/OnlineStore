using Application.Abstractions.Messaging;

namespace Application.Products.GetByCategoryPagination;

public sealed record GetProductByCategoryTypePaginationQuery(byte CategoryType, int PageNumber, int PageSize) 
    : IQuery<List<ProductResponse>>;