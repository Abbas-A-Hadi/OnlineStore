using SharedKernel;

namespace Domain.Users;

public sealed record User : Entity
{
    public UserId ? Id { get; init; }
    public UserName UserName { get; init; }
    public string PasswordHash { get; init; }
    public string Role  { get; init; }

    internal User(UserId userId, UserName userName, string passwordHash, string role)
    {
        Id = userId;
        UserName = userName;
        PasswordHash = passwordHash;
        Role = role;
    }
}

public static class UserCreation
{
    extension(User)
    {
        public static User CreateNew(UserName userName, string passwordHash, string role)
            => CreateValid(new UserId(Guid.NewGuid()), userName, passwordHash, role);
        public static User Restore(UserId userId, UserName userName, string passwordHash, string role)
            => CreateValid(userId, userName, passwordHash, role);

        private static User CreateValid(UserId userId, UserName userName, string passwordHash, string role)
        {
            // TODO: Create User validation.
            return new User(userId, userName, passwordHash, role);
        }
    }
}