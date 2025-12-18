namespace Domain.Products;

public sealed record Product(ProductId Id, string Name, float Price, Currency Currency, 
    string Brand, string Category, string ShortDescription, string LongDescription, 
    int Reviews, string StockStatus, List<string> Features, List<string> ImagesURLs);