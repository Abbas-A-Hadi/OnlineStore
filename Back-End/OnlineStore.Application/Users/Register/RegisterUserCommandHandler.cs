using System.Transactions;
using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;
using Application.Repository;
using Domain.RefreshTokens;
using Domain.Users;
using SharedKernel;

namespace Application.Users.Register;

internal sealed class RegisterUserCommandHandler(
    IRefreshTokenRepository refreshTokenRepository,
    IAuthService authService,
    ITokenProvider tokenProvider,
    IRefreshTokenProvider refreshTokenProvider) 
    : ICommandHandler<RegisterUserCommand, RegisterUserResponse>
{
    public async Task<Result<RegisterUserResponse>> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        using TransactionScope scope = new TransactionScope();
        
        RegisterUserDto registerUserDto = new (
            email: command.Email,
            password: command.Password,
            firstName: command.FirstName, 
            lastName: command.LastName,
            dateOfBirth: command.DateOfBirth);
        
        Result<User> registeredUserResult = await authService.RegisterUserAsync(registerUserDto, cancellationToken);

        if (!registeredUserResult.IsSuccess)
        {
            return Result.Failure<RegisterUserResponse>(UserErrors
                .CreationFailure(command.Email, command.FirstName, command.LastName));
        }
        
        User registeredUser = registeredUserResult.Value;
        string accessToken = tokenProvider.Create(registeredUser);

        RefreshToken refreshToken = RefreshToken.CreateNew(
            token: refreshTokenProvider.Create(registeredUser),
            expirationTime: DateTime.UtcNow.AddDays(7),
            userId: registeredUser.Id);;

        if (!await refreshTokenRepository.CreateRefreshTokenAsync(refreshToken, cancellationToken))
        {
            return Result.Failure<RegisterUserResponse>(RefreshTokenErrors
                .CreationFailure(refreshToken.Token));
        }
        
        scope.Complete();
        
        return new RegisterUserResponse()
        {
            UserId = registeredUser.Id.Value,
            Email = registeredUser.Email,
            FirstName = registeredUser.FirstName,
            LastName = registeredUser.LastName,
            DateOfBirth = registeredUser.DateOfBirth,
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        };
    }
}