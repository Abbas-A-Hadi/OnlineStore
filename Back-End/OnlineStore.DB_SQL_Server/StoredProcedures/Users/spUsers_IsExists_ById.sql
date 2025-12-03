USE OnlineStore_DB;
GO

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
        RETURN 1;
    END;

    RETURN 0;
END;