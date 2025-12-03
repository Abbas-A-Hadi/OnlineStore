USE OnlineStore_DB;
GO

CREATE VIEW vNonDeletedPeople
AS
(
    SELECT 
        p.Id AS [PersonId], p.FullName, p.DateOfBirth, p.Email, p.Phone,
        vA.AddressAsString, vA.PostCode, vA.Street,
        vA.CountryName, vA.CityName
    FROM People AS p
        INNER JOIN vAddresses AS vA ON p.AddressId = vA.Id
    WHERE p.IsDeleted = 0 
);