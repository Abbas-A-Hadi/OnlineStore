using Domain.Users;
using FluentValidation;

namespace Application.Users.Register;

internal sealed class RegisterUserCommandValidator: AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(c => c.FirstName)
            .NotEmpty()
                .WithMessage("First name is required")
            .Length(User.MinFirstNameLength, User.MaxFirstNameLength)
                .WithMessage("First name length must be between {min} and {max}");
        
        RuleFor(c => c.LastName)
            .NotEmpty()
                .WithMessage("Last name is required")
            .Length(User.MinLastNameLength, User.MaxLastNameLength)
                .WithMessage("Last name length must be between {min} and {max}");
        
        RuleFor(u => u.DateOfBirth)
            .Must(IsDateInPast)
                .WithMessage("Date of birth is in future")
            .Must(IsUser18YearsOrOlder)
                .WithMessage("User age is under 18");

        RuleFor(c => c.Email)
            .NotEmpty()
                .WithMessage("Email is required")
            .EmailAddress()
                .WithMessage("Invalid Email")
            .Length(User.MinEmailLength, User.MaxEmailLength)
                .WithMessage("Email length must be between {min} and {max}");
        
        RuleFor(c => c.Password)
            .NotEmpty()
                .WithMessage("Password is required")
            .Length(User.MinPasswordLength, User.MaxPasswordLength)
                .WithMessage("Password length must be between {min} and {max}");
    }
    
    public static bool IsDateInPast(DateOnly dateOfBirth)
    {
        return dateOfBirth < DateOnly.FromDateTime(DateTime.UtcNow);
    }
    
    public static bool IsUser18YearsOrOlder(DateOnly dateOfBirth)
    {
        return dateOfBirth.AddYears(18) <= DateOnly.FromDateTime(DateTime.UtcNow);
    }
}