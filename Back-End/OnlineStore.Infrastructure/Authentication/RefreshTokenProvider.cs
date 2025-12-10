using System.Security.Cryptography;
using Application.Abstractions.Authentication;
using Domain.Users;

namespace Infrastructure.Authentication;

internal sealed class RefreshTokenProvider : IRefreshTokenProvider
{
    public string Create(User user)
    {
        byte[] randomBytes = RandomNumberGenerator.GetBytes(32);
        return Convert.ToBase64String(randomBytes);
    }
}