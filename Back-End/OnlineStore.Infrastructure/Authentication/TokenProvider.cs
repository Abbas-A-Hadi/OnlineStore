using System.Security.Claims;
using System.Text;
using Application.Abstractions.Authentication;
using Domain.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Authentication;

internal sealed class TokenProvider(IConfiguration configuration) : ITokenProvider
{
    public string Create(User user)
    {
        string secretKey = configuration["jwt:Secret"]!;
        SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(secretKey));

        SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);

        SecurityTokenDescriptor tokenDescriptor = new()
        {
            Subject = new ClaimsIdentity([
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.Value.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            ]),
            Expires = DateTime.UtcNow.AddMinutes(configuration.GetValue<int>("jwt:ExpirationInMinutes")),
            SigningCredentials = credentials,
            Issuer = configuration["jwt:Issuer"],
            Audience = configuration["jwt:Audience"],
        };

        JsonWebTokenHandler handler = new();

        string token = handler.CreateToken(tokenDescriptor);

        return token;
    }
}