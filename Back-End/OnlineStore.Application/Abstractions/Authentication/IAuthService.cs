using Application.Authentication.DTOs;
using Domain.Users;
using SharedKernel;

namespace Application.Abstractions.Authentication;

public interface IAuthService
{
    Task<Result<User>> RegisterUserAsync(RegisterUserDto registerUserDto, CancellationToken cancellationToken);
    Task<Result<TokenDto>> LoginUserAsync(LoginUserDto loginUserDto, CancellationToken cancellationToken);
    Task<Result<TokenDto>> RefreshTokensAsync(RefreshTokenDto refreshTokenDto, CancellationToken cancellationToken);
}