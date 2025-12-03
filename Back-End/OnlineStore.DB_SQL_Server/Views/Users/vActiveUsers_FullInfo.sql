USE OnlineStore_DB;
GO

CREATE VIEW vActiveUsers_FullInfo
AS 
(
    SELECT
        u.Id AS [UserId], u.UserName, u.Role, 
        vP.FullName, vP.DateOfBirth, vP.Email, vP.Phone,  
        vP.AddressAsString, vP.PostCode, vP.Street, vP.CountryName, vP.CityName
    FROM Users AS u
        INNER JOIN vNonDeletedPeople AS vP ON u.PersonId = vP.PersonId
    WHERE u.IsActive = 1 AND u.IsDeleted = 0
);