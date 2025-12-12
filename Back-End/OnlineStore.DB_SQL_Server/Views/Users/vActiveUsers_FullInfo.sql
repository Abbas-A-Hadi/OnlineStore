CREATE VIEW vActiveUsers_FullInfo
AS 
(
    SELECT
        u.Id, u.Email, u.PasswordHash, 
        u.FirstName, u.LastName, u.DateOfBirth, u.Role 
    FROM Users AS u
    WHERE u.IsActive = 1 AND u.IsDeleted = 0
);