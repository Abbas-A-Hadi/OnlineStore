using Application.Abstractions.Authentication;
using Application.Abstractions.Messaging;
using Application.Authentication.DTOs;
using SharedKernel;

namespace Application.Users.LoginByEmailAndPassword;

internal sealed class LoginUserCommandHandler(IAuthService authService)
    : ICommandHandler<LoginUserCommand, TokenDto>
{
    public async Task<Result<TokenDto>> Handle(LoginUserCommand command, CancellationToken cancellationToken)
    {
        LoginUserDto loginUserDto = new(command.Email, command.Password);
        
        return await authService.LoginUserAsync(loginUserDto, cancellationToken);
    }
}