using System.Text.Json.Serialization;
using Application.Abstractions.Messaging;
using Application.Users.Register;
using FluentValidation;
using SharedKernel;
using Web.Api.Extensions;
using Web.Api.Infrastructure;

namespace Web.Api.Endpoints.Auth;

public sealed class Register : IEndpoint
{
    public sealed record RegisterUserRequest(string Email, string Password, string FirstName, string LastName,
        [property: JsonPropertyName("dateOfBirthAsDateOnlyString")]
        DateOnly DateOfBirth, string Role);
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("api/auth/register", RegisterUserAsync)
            .WithTags(Tags.Users)
            .WithName("RegisterUser");
    }
    
    private async Task<IResult> RegisterUserAsync(
        RegisterUserRequest request,
        ICommandHandler<RegisterUserCommand, RegisterUserResponse> handler,
        IValidator<RegisterUserCommand> validator,
        CancellationToken cancellationToken) 
    {
        RegisterUserCommand command = new (
            Email: request.Email,
            Password: request.Password,
            FirstName: request.FirstName,
            LastName: request.LastName,
            DateOfBirth: request.DateOfBirth,
            Role: request.Role);
        
        var validationResult = await validator.ValidateAsync(command, cancellationToken);
        if (!validationResult.IsValid)
        {
            HttpValidationProblemDetails problemDetails = new(validationResult.ToDictionary())
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Validation Error",
                Detail = "One or more validation errors occurred.",
                Instance = "RegisterUser"
            };
            
            return Results.Problem(problemDetails);
        }
                
        Result<RegisterUserResponse> result = await handler.Handle(command, cancellationToken);

        return result.Match(Results.Ok, CustomResults.Problem);
    }
}