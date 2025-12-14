using Application.Abstractions.Authentication;
using Application.Abstractions.Database;
using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;
using Application.Repository;
using Domain.RefreshTokens;
using Domain.Users;
using SharedKernel;

namespace Application.Users.Register;

internal sealed class RegisterUserCommandHandler(
    IDbTransactionOps transactionOps,
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    IRefreshTokenRepository refreshTokenRepository,
    ITokenProvider tokenProvider,
    IRefreshTokenProvider refreshTokenProvider) 
    : ICommandHandler<RegisterUserCommand, RegisterUserResponse>
{
    public async Task<Result<RegisterUserResponse>> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        using (transactionOps)
        {
            RegisterUserDto registerUserDto = new (
                email: command.Email,
                password: command.Password,
                firstName: command.FirstName, 
                lastName: command.LastName,
                dateOfBirth: command.DateOfBirth);
            
            // Begin Transaction Here (Start).
            transactionOps.Begin();

            // Transaction Op1.
            if (await userRepository.IsUserExistsAsync(registerUserDto.Email, cancellationToken))
            {
                return Result.Failure<RegisterUserResponse>(UserErrors.EmailNotUnique);
            }
        
            User registeredUser = User.CreateNew(
                email: registerUserDto.Email,
                passwordHash: passwordHasher.Hash(registerUserDto.Password),
                firstName: registerUserDto.FirstName,
                lastName: registerUserDto.LastName,
                dateOfBirth: registerUserDto.DateOfBirth);

            if (!await userRepository.RegisterUserAsync(registeredUser, 
                    transactionOps.GetCurrentDbTransaction(), cancellationToken))
            {
                return Result.Failure<RegisterUserResponse>(UserErrors
                    .CreationFailure(registerUserDto.Email, registerUserDto.FirstName,
                        registerUserDto.LastName));
            }
            // Transaction Op1 Completed.

            string accessToken = tokenProvider.Create(registeredUser);

            RefreshToken refreshToken = RefreshToken.CreateNew(
                token: refreshTokenProvider.Create(registeredUser),
                expirationTime: DateTime.UtcNow.AddDays(7),
                userId: registeredUser.Id);

            // Transaction Op2.
            if (!await refreshTokenRepository.CreateRefreshTokenAsync(refreshToken, 
                    transactionOps.GetCurrentDbTransaction(), cancellationToken))
            {
                // TODO: Rollback The Transaction Here.
                transactionOps.Rollback();
                
                return Result.Failure<RegisterUserResponse>(RefreshTokenErrors
                    .CreationFailure(refreshToken.Token));
            }
            // Transaction Op2 Completed.

            // End Transaction Here (Commit).
            transactionOps.Commit();

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
}