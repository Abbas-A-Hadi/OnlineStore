CREATE FUNCTION tvfUsers_GetAllActiveUsers()
RETURNS TABLE
AS
RETURN (
    SELECT
        vU.Id, vU.Email, vU.PasswordHash, 
        vU.FirstName, vU.LastName, vU.DateOfBirth,
        vU.RefreshToken, vU.RefreshTokenExpirationTime, vU.Role
    FROM vActiveUsers_FullInfo AS vU
);