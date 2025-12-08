namespace Domain.Users;

public sealed record User
{
    public UserId Id { get; init; }
    public string Email { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string PasswordHash { get; init; }

    internal User(UserId userId, string email, string firstName, string lastName, string passwordHash)
    {
        Id = userId;
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        PasswordHash = passwordHash;
    }
}

public static class UserCreation
{
    extension(User)
    {
        public static User? CreateNew(string email, string firstName, string lastName, string passwordHash)
            => CreateValid(new UserId(Guid.NewGuid()), email, firstName, lastName, passwordHash);
        
        public static User? Restore(UserId userId, string email, string firstName, string lastName, string passwordHash)
            => CreateValid(userId, email, firstName, lastName, passwordHash);

        private static User? CreateValid(UserId userId, string email, string firstName, string lastName, string passwordHash)
        {
            // TODO: Create User validation.
            return new User(userId, email, firstName, lastName, passwordHash);
        }
    }
}