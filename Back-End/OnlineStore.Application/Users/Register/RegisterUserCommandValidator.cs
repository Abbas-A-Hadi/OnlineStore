using FluentValidation;

namespace Application.Users.Register;

internal sealed class RegisterUserCommandValidator: AbstractValidator<RegisterUserCommand>
{
    public static int MinimumPasswordLength = 8;
    public static int MaximumPasswordLength = 50;
        
    public RegisterUserCommandValidator()
    {
        RuleFor(c => c.FirstName).NotEmpty();
        
        RuleFor(c => c.LastName).NotEmpty();
        
        RuleFor(c => c.Email)
            .NotEmpty()
                .WithMessage("Email is required")
            .EmailAddress()
                .WithMessage("Invalid Email");
        
        RuleFor(c => c.Password)
            .NotEmpty()
                .WithMessage("Password is required")
            .Length(MinimumPasswordLength, MaximumPasswordLength)
                .WithMessage("Password must be between {min} and {max}");
    }
}