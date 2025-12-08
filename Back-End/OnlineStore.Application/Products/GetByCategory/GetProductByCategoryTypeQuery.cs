using Application.Abstractions.Messaging;
using Domain.Categories;
using Domain.Products;

namespace Application.Products.GetByCategory;

public sealed record GetProductByCategoryTypeQuery(CategoryTypes CategoryType) : IQuery<List<Product>>;