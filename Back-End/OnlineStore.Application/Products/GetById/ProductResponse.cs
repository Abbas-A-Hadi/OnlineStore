using Domain.Products;

namespace Application.Products.GetById;

public sealed record ProductResponse(Guid Id, string Name, string Sku, float Price, Currency Currency, 
    string StockStatus, int Reviews, string ShortDescription, string LongDescription, 
    List<string> Features, List<string> ImagePaths);