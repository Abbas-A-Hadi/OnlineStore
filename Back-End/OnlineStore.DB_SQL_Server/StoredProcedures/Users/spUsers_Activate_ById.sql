USE OnlineStore_DB;
GO

ALTER PROCEDURE spUsers_Activate_ById
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET IsActive = 1
    WHERE Users.Id = @UserId;

    RETURN @@ROWCOUNT;
END;