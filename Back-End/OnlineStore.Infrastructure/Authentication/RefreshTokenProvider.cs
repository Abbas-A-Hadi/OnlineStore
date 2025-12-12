using System.Security.Cryptography;
using Application.Abstractions.Authentication;
using Domain.Users;

namespace Infrastructure.Authentication;

internal sealed class RefreshTokenProvider : IRefreshTokenProvider
{
    public string Create(User user) 
        => Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
}