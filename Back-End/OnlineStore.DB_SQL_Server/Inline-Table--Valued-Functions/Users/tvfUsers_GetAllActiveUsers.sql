CREATE FUNCTION tvfUsers_GetAllActiveUsers()
RETURNS TABLE
AS
RETURN (
    SELECT
        vU.Id, vU.Email, vU.PasswordHash, 
        vU.FirstName, vU.LastName, vU.DateOfBirth, 
        dbo.ConvertUserRoleFromTinyIntToVarchar(vU.Role) AS Role
    FROM vActiveUsers_FullInfo AS vU
);