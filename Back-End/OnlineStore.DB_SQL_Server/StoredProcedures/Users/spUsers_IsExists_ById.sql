CREATE PROCEDURE spUsers_IsExists_ById
    @UserID UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM Users AS u
        WHERE u.Id = @UserID
    ) BEGIN
        SELECT 1;
    END;

    SELECT 0;
END;