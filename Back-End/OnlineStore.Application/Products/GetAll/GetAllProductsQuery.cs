using Application.Abstractions.Messaging;
using Domain.Products;

namespace Application.Products.GetAll;

public sealed record GetAllProductsQuery : IQuery<List<Product>>;