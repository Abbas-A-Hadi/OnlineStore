CREATE FUNCTION tvfUsers_GetAllActiveUsersFullInfo()
RETURNS TABLE
AS
RETURN (
    SELECT
        vU.UserId, vU.UserName, vU.Role, 
        vU.FullName, vU.DateOfBirth, vU.Email, vU.Phone,
        vU.AddressAsString, vU.PostCode, vU.Street, vU.CountryName, vU.CityName
    FROM vActiveUsers_FullInfo AS vU
);