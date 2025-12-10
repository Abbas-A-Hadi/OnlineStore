using Application.Abstractions.Messaging;

namespace Application.Products.GetAll;

public sealed record GetAllProductsQuery : IQuery<List<ProductResponse>>;