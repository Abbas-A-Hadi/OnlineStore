using System.Diagnostics;
using Application.Repository;
using Domain.Users;

namespace Infrastructure.Database.Users;

public sealed class UserRepository : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
    
    public async Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
    
    public async Task<bool> IsUserExistsAsync(Guid userId, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
    public async Task<bool> IsUserExistsAsync(string email, string passwordHash, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
    
    public async Task<bool> CreateUserAsync(User user, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
    
    public async Task<bool> UpdateUserAsync(User user, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
    
    public async Task<bool> DeleteUserAsync(Guid userId, CancellationToken cancellationToken) 
    {
        
        throw new UnreachableException();
    }
}