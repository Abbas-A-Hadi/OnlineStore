namespace Application.Products.GetByCategoryPagination;

public sealed record ProductResponse(int Id, string Name, float Price, string Currency, 
    string Brand, string Category, string ShortDescription, string LongDescription, 
    int Reviews, string StockStatus, List<string> Features, List<string> ImagesURLs);