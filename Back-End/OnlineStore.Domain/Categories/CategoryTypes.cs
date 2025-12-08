namespace Domain.Categories;

public enum CategoryTypes : byte
{
    None = 0,
    Keyboard = 1,
    Mouse = 2,
    
    //..... And the rest of product categories.
    // Note: I will use binary flag because Mouse and Keyboard are in Exsesory category.
}