using Application.Users.Register;
using Domain.Users;
using FluentValidation;

namespace Application.Authentication;

public sealed class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(u => u.FirstName)
            .NotEmpty()
                .WithMessage("First name is required")
            .Length(User.MinFirstNameLength, User.MaxFirstNameLength)
                .WithMessage("First name length must be between {min} and {max}");
        
        RuleFor(u => u.LastName)
            .NotEmpty()
                .WithMessage("Last name is required")
            .Length(User.MinLastNameLength, User.MaxLastNameLength)
                .WithMessage("Last name length must be between {min} and {max}");

        RuleFor(u => u.DateOfBirth)
            .Must(RegisterUserCommandValidator.IsNotValidDateOfBirth)
                .WithMessage("Date of birth is in future")
            .Must(RegisterUserCommandValidator.IsUserUnder18Years)
                .WithMessage("User age is under 18");
        
        RuleFor(u => u.Email)
            .NotEmpty()
                .WithMessage("Email is required")
            .EmailAddress()
                .WithMessage("Invalid Email")
            .Length(User.MinEmailLength, User.MaxEmailLength)
                .WithMessage("Email length must be between {min} and {max}");
        
        RuleFor(u => u.Password)
            .NotEmpty()
                .WithMessage("Password is required")
            .Length(User.MinPasswordLength, User.MaxPasswordLength)
                .WithMessage("Password length must be between {min} and {max}");
    }
}