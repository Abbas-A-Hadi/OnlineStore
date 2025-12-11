CREATE VIEW vActiveUsers_MainInfo
AS
(
    SELECT
        u.Id, u.Email, 
        u.FirstName, u.LastName, u.DateOfBirth
    FROM Users AS u
    WHERE u.IsActive = 1 AND u.IsDeleted = 0
);