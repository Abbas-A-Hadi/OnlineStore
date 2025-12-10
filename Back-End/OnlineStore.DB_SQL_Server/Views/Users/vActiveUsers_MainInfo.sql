CREATE VIEW vActiveUsers_MainInfo
AS (
    SELECT 
        u.Id, u.UserName, u.Role
    FROM Users AS u
   WHERE u.IsActive = 1 AND u.IsDeleted = 0
);