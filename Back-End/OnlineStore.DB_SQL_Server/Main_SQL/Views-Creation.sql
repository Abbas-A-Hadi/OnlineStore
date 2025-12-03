USE OnlineStore_DB;
GO

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
        a.Id AS [AddressId], a.FullyAsString AS [AddressAsString], a.PostCode, a.Street,
        co.Name AS [CountryName], ci.Name AS [CityName]
    FROM Addresses AS a
         INNER JOIN Countries AS co ON a.CountryId = co.Id
         INNER JOIN Cities AS ci ON a.CityId = ci.Id
);
GO


----////////////////////////
---- People
CREATE VIEW vNonDeletedPeople
AS
(
    SELECT
        p.Id AS [PersonId], p.FullName, p.DateOfBirth, p.Email, p.Phone,
        vA.AddressAsString, vA.PostCode, vA.Street,
        vA.CountryName, vA.CityName
    FROM People AS p
         INNER JOIN vAddresses AS vA ON p.AddressId = vA.AddressId
    WHERE p.IsDeleted = 0
);
GO


----////////////////////////
---- Users
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






