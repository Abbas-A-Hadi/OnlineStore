CREATE FUNCTION tvfUsers_GetMainInfoById(@UserId UNIQUEIDENTIFIER)
RETURNS TABLE 
AS
RETURN (
    SELECT TOP 1 
        u.UserName, u.Role
    FROM Users AS u 
    WHERE u.Id = @UserId
);