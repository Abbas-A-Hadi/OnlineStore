using Domain.Users;

namespace Application.Repository;

public interface IUserRepository
{
    Task<User?> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken);
    
    Task<User?> GetUserByUserNameAndPasswordHashAsync(string username, string passwordHash, CancellationToken cancellationToken);
    
    Task<bool> IsUserExistsAsync(Guid userId, CancellationToken cancellationToken);
    Task<bool> IsUserExistsAsync(string username, string passwordHash, CancellationToken cancellationToken);
    
    Task<bool> CreateUserAsync(User user, CancellationToken cancellationToken);
    
    Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken);
    
    Task<bool> DeleteUserAsync(Guid userId, CancellationToken cancellationToken);
}