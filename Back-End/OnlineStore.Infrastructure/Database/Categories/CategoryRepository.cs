using Application.Repository;

namespace Infrastructure.Database.Categories;

public sealed class CategoryRepository(ISqlDataAccess db) : ICategoryRepository
{
    
}