using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Presentation;

public class TokenGenerator
{
    public string GenerateToken(Guid userID, string email)
    {
        JwtSecurityTokenHandler tokenHandler = new();
        byte[] key = "ForTheLoveOfGodStoreAndLoadThisSecurely"u8.ToArray();

        List<Claim> claims =
        [
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, userID.ToString()),
            new(JwtRegisteredClaimNames.Email, email)
        ];

        SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddMinutes(10),
            Issuer = "https://id.dometrain.com",
            Audience = "https://dometrain.com",
            SigningCredentials = 
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        SecurityToken? token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}