namespace Domain.Users;

public sealed record UserName
{
    public string Value { get; init; }
    
    internal UserName(string value) => Value = value;
}

public static class UserNameCreation
{
    extension(UserName)
    {
        public static UserName CreateNew(string userName)
            => CreateValid(userName);

        public static UserName Restore(string userName)
            => CreateValid(userName);

        private static UserName CreateValid(string userName)
        {
            // TODO: Create UserName validation.
            return new UserName(userName);
        }
    }
}