using Application.Authentication;
using Domain.Users;
using SharedKernel;

namespace Application.Abstractions.Authentication;

public interface IAuthService
{
    Task<Result<User>> RegisterAsync(UserDto userDto, CancellationToken cancellationToken);
    Task<Result<TokenDto>> LoginAsync(UserDto userDto, CancellationToken cancellationToken);
    Task<Result<TokenDto>> RefreshTokensAsync(RefreshTokenDto refreshTokenDto, CancellationToken cancellationToken);
}