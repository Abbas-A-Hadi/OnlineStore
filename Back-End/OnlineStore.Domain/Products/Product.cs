namespace Domain.Products;

public sealed record Product(ProductId Id, string Name, string Sku, float Price, Currency Currency, 
    string StockStatus, int Reviews, string ShortDescription, string LongDescription, 
    List<string> Features, List<string> ImagePaths);