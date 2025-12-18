using Application.Abstractions.Messaging;

namespace Application.Products.GetById;

public sealed record GetProductByIdQuery(int ProductId) : IQuery<ProductResponse>;