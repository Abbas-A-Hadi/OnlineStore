using Domain.Users;

namespace Infrastructure.Database.Users;

internal static class UserDbRowExtensions
{
    public static User MapToUser(this UserDbRow row)
        => User.Restore(
            userId: new UserId(row.Id),
            email: row.Email,
            passwordHash: row.PasswordHash,
            firstName: row.FirstName,
            lastName: row.LastName,
            dateOfBirth: row.DateOfBirth,
            refreshToken: row.RefreshToken,
            refreshTokenExpirationTime: row.RefreshTokenExpirationTime,
            role: row.Role);
}