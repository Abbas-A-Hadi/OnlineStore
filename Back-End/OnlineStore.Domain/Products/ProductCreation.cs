namespace Domain.Products;

public static class ProductCreation
{
    extension(Product)
    {
        public static Product Create(ProductId productId, string name, float price, Currency currency,
            string brand, string category, string stockStatus, int reviews, string shortDescription, 
            string longDescription, List<string> features, List<string> imagesURLs)
        {
            return new Product(Id: productId, Name: name, price, 
                Currency: currency, Brand: brand, Category: category,
                ShortDescription: shortDescription, LongDescription: longDescription, 
                Reviews: reviews, StockStatus: stockStatus, Features: features, ImagesURLs: imagesURLs);
        }
    }
}