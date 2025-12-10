CREATE FUNCTION tvfUsers_GetAllActiveUsersMainInfo()
RETURNS TABLE
AS
RETURN (
    SELECT
        vU.UserId, vU.UserName, vU.Role
    FROM vActiveUsers_MainInfo AS vU
);