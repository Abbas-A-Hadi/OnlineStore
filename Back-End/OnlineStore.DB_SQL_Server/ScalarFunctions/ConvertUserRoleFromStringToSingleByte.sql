CREATE FUNCTION ConvertUserRoleFromVarcharToTinyInt(@UserRoleAsString VARCHAR(20))
RETURNS TINYINT 
AS 
BEGIN 
    DECLARE @roleAsTinyInt TINYINT =
        CASE @UserRoleAsString
           WHEN 'User' THEN 0
           WHEN 'Admin' THEN 1
           ELSE 255
        END;
    
    RETURN @roleAsTinyInt;
END;