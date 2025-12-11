CREATE FUNCTION tvfUsers_GetByEmail(@Email VARCHAR(40))
RETURNS TABLE
AS
RETURN (
    SELECT TOP 1
        vU.Id, vU.Email, vU.PasswordHash,
        vU.FirstName, vU.LastName, vU.DateOfBirth,
        vU.RefreshToken, vU.RefreshTokenExpirationTime, vU.Role
    FROM vActiveUsers_FullInfo AS vU
    WHERE vU.Email = @Email
);