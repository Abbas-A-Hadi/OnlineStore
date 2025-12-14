using System.Data;
using Domain.Users;

namespace Application.Repository;

public interface IUserRepository
{
    Task<User?> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken);
    
    Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken);
    
    Task<bool> IsUserExistsAsync(Guid userId, CancellationToken cancellationToken);
    Task<bool> IsUserExistsAsync(string email, CancellationToken cancellationToken);
    Task<bool> IsUserExistsAsync(string email, string passwordHash, CancellationToken cancellationToken);
    
    Task<bool> RegisterUserAsync(User user, CancellationToken cancellationToken);
    Task<bool> RegisterUserAsync(User user, IDbTransaction transaction, CancellationToken cancellationToken);
    
    Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken);
    
    Task<bool> DeleteUserAsync(Guid userId, CancellationToken cancellationToken);
}