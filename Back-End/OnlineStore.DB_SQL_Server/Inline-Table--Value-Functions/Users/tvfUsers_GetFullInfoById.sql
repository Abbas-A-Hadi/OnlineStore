USE OnlineStore_DB;
GO

CREATE FUNCTION tvfUsers_GetFullInfoById(@UserId UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN (
    SELECT TOP 1
        vU.UserName, vU.Role,
        vU.FullName, vU.DateOfBirth, vU.Email, vU.Phone,
        vU.AddressAsString, vU.PostCode, vU.Street, vU.CountryName, vU.CityName
    FROM vActiveUsers_FullInfo AS vU
    WHERE vU.UserId = @UserId
);