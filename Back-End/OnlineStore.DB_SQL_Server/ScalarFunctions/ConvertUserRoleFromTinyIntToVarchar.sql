CREATE FUNCTION ConvertUserRoleFromTinyIntToVarchar(@UserRoleAsTinyInt TINYINT)
    RETURNS VARCHAR(20)
AS
BEGIN
    DECLARE @roleAsVarchar VARCHAR(20) =
        CASE @UserRoleAsTinyInt
            WHEN 0 THEN 'User'
            WHEN 1 THEN 'Admin'
            ELSE ''
            END;

    RETURN @roleAsVarchar;
END;