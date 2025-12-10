using Domain.Users;

namespace Application.Abstractions.Authentication;

public interface IRefreshTokenProvider
{
    string Create(User user);
}