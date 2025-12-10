namespace Application.Authentication;

public sealed class UserDto
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public DateOnly DateOfBirth { get; init; }
    public string Email { get; set; }
    public string Password { get; set; }
    
    internal UserDto(string firstName, string lastName, DateOnly dateOfBirth, string email, string password)
    {
        FirstName = firstName;
        LastName = lastName;
        DateOfBirth = dateOfBirth;
        Email = email;
        Password = password;
    }
}

public static class UserDtoExtensions
{
    extension(UserDto)
    {
        public static UserDto? CreateNew(string firstName, string lastName, 
            DateOnly dateOfBirth, string email, string password)
        {
            // if (string.IsNullOrWhiteSpace(firstName) 
            //         || firstName is { Length: < MinFirstNameLength or > MaxFirstNameLength })
            //     return null;
            //
            // if (string.IsNullOrWhiteSpace(lastName) 
            //         || lastName is { Length: < MinLastNameLength or > MaxLastNameLength })
            //     return null;
            //
            // if (string.IsNullOrWhiteSpace(email)
            //     || email is { Length: < MinEmailLength or > MaxEmailLength })
            //     return null;
            //
            // if (string.IsNullOrWhiteSpace(password)
            //     || password is { Length: < MinPasswordLength or > MaxPasswordLength })
            //     return null;
            
            return new UserDto(firstName, lastName, dateOfBirth, email, password);
        }
    }
    
    // extension (UserDto user)
    // {
    //     public bool IsValid()
    //     {
    //         if (string.IsNullOrWhiteSpace(user.Email)
    //             || user.Email is { Length: < MinEmailLength or > MaxEmailLength })
    //             return false;
    //
    //         if (string.IsNullOrWhiteSpace(user.Password)
    //             || user.Password is { Length: < MinPasswordLength or > MaxPasswordLength })
    //             return false;
    //
    //         return true;
    //     }
    // }
}