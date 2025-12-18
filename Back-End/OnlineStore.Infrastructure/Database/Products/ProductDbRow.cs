using Application.Products.GetByCategoryPagination;
using Dapper;
using Domain.Products;

namespace Infrastructure.Database.Products;

public sealed class ProductDbRow
{
    public int Id { get; set; }
    public string Name { get; set; }
    public float Price { get; set; }
    public string Currency { get; set; } 
    public string Brand { get; set; } 
    public string Category { get; set; } 
    public string ShortDescription { get; set; }
    public string LongDescription  { get; set; }
    public int Reviews { get; set; }
    public string StockStatus { get; set; } 
    public string Features { get; set; }
    public string ImagesURLs { get; set; }
}

public static class ProductDbRowExtensions
{
    extension(ProductDbRow row)
    {
        public ProductResponse MapToProductResponse()
            => new ProductResponse(Id: row.Id, Name: row.Name, Price: row.Price, 
                Currency: row.Currency, Brand: row.Brand, Category: row.Category, 
                ShortDescription: row.ShortDescription, LongDescription: row.LongDescription, 
                Reviews: row.Reviews, StockStatus: row.StockStatus, 
                Features: row.Features.Split("||").AsList(), ImagesURLs: row.ImagesURLs.Split("||").AsList());
        
        public Product MapToProduct()
            => Product.Create(
                productId: new ProductId(row.Id), name: row.Name, price: row.Price, 
                currency: new Currency(row.Currency), brand: row.Brand, category: row.Category, 
                shortDescription: row.ShortDescription, longDescription: row.LongDescription, 
                reviews: row.Reviews, stockStatus: row.StockStatus, 
                features: row.Features.Split("||").AsList(), imagesURLs: row.ImagesURLs.Split("||").AsList());
    }
}