namespace Domain.Users;

public static class UserCreation
{
    extension(User)
    {
        public static User CreateNew(string email, string passwordHash, string firstName, 
            string lastName, DateOnly dateOfBirth, string? refreshToken = null, 
            DateTime? refreshTokenExpirationTime = null, string role = nameof(RoleType.User))
        {
            return new User(new UserId(Guid.NewGuid()), email, passwordHash, firstName, 
                lastName, dateOfBirth, role);
        }
        
        public static User Restore(UserId userId, string email, string passwordHash, 
            string firstName, string lastName, DateOnly dateOfBirth, string? refreshToken = null, 
            DateTime? refreshTokenExpirationTime = null, string role = nameof(RoleType.User))
        {
            return new User(userId, email, passwordHash, firstName, lastName, dateOfBirth, role);
        }
    }
}