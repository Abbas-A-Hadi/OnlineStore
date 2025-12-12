CREATE PROCEDURE spUsers_IsExists_ByEmailOnly
    @Email VARCHAR(40)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Users AS u
        WHERE u.Email = @Email
    ) BEGIN
        SELECT 1;
    END;

    SELECT 0;
END;