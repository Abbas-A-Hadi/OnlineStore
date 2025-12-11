CREATE FUNCTION tvfUsers_GetById(@UserId UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN (
    SELECT TOP 1
        vU.Id, vU.Email, vU.PasswordHash,
        vU.FirstName, vU.LastName, vU.DateOfBirth,
        vU.RefreshToken, vU.RefreshTokenExpirationTime, vU.Role
    FROM vActiveUsers_FullInfo AS vU
    WHERE vU.Id = @UserId
);