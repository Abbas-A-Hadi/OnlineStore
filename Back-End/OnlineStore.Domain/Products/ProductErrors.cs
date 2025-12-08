using SharedKernel;

namespace Domain.Products;

public static class ProductErrors
{
    public static readonly Error NoProductFound = new Error(
        "Products.NoProductFound",
        "No product was found.",
        ErrorType.NotFound);
    
    public static Error NotFound(Guid productId) => Error.NotFound(
        "Products.NotFound",
        $"Product with Id = '{productId}' not found");
}