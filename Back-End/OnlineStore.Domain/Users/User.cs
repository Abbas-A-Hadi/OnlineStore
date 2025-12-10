namespace Domain.Users;

public sealed record User
{
    public UserId Id { get; init; }
    public string Email { get; init; }
    public string PasswordHash { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public DateOnly DateOfBirth { get; init; }
    public string? RefreshToken { get; init; }
    public DateTime? RefreshTokenExpirationTime { get; init; }
    public string Role { get; init; }

    internal User(UserId userId, string email, string passwordHash, 
        string firstName, string lastName, DateOnly dateOfBirth, 
        string? refreshToken, DateTime? refreshTokenExpirationTime, string role)
    {
        Id = userId;
        Email = email;
        PasswordHash = passwordHash;
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        RefreshToken = refreshToken;
        RefreshTokenExpirationTime = refreshTokenExpirationTime;
        Role = role;
    }
    
    public const int MinFirstNameLength = 3;
    public const int MaxFirstNameLength = 20;
    
    public const int MinLastNameLength = 3;
    public const int MaxLastNameLength = 20;
    
    public const int MinEmailLength = 7;
    public const int MaxEmailLength = 40;
        
    public const int MinPasswordLength = 8;
    public const int MaxPasswordLength = 50;
}