USE OnlineStore_DB;
GO

CREATE VIEW vAddresses
AS
(
    SELECT
        a.FullyAsString AS [AddressAsString], a.PostCode, a.Street,
        co.Name AS [CountryName], ci.Name AS [CityName]
    FROM Addresses AS a
        INNER JOIN Countries AS co ON a.CountryId = co.Id
        INNER JOIN Cities AS ci ON a.CityId = ci.Id
);