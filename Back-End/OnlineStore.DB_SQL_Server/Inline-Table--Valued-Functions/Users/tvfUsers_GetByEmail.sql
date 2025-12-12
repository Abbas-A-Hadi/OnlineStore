CREATE FUNCTION tvfUsers_GetByEmail(@Email VARCHAR(40))
RETURNS TABLE
AS
RETURN (
    SELECT TOP 1
        vU.Id, vU.Email, vU.PasswordHash,
        vU.FirstName, vU.LastName, vU.DateOfBirth, 
        dbo.ConvertUserRoleFromTinyIntToVarchar(vU.Role) AS Role
    FROM vActiveUsers_FullInfo AS vU
    WHERE vU.Email = @Email
);