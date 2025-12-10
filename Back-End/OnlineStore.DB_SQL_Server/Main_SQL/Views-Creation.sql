--USE OnlineStore_DB;
--GO

/*
    ==========================
    ===== Views Creation =====
    ==========================
*/


----////////////////////////
---- Addresses
CREATE VIEW vAddresses
AS
(
    SELECT
        a.Id AS [AddressId], a.FullyAsString AS [AddressAsString], a.PostCode, 
        co.Name AS [CountryName], ci.Name AS [CityName]
    FROM Addresses AS a
         INNER JOIN Countries AS co ON a.CountryId = co.Id
         INNER JOIN Cities AS ci ON a.CityId = ci.Id
);
GO


----////////////////////////
---- Users
CREATE VIEW vActiveUsers_FullInfo
AS
(
    SELECT
        u.Id AS [UserId], u.FirstName, u.LastName, u.DateOfBirth, u.Email, vA.Phone,
        vA.AddressAsString, vA.PostCode, vA.CountryName, vA.CityName
    FROM Users AS u
         INNER JOIN vAddresses AS vA ON u.PersonId = vA.PersonId
    WHERE u.IsActive = 1 AND u.IsDeleted = 0
);
GO

CREATE VIEW vActiveUsers_MainInfo
AS (
   SELECT
       u.Id, u.UserName, u.Role
   FROM Users AS u
   WHERE u.IsActive = 1 AND u.IsDeleted = 0
);
GO



----////////////////////////
---- 



----////////////////////////
---- 



----////////////////////////
---- 






