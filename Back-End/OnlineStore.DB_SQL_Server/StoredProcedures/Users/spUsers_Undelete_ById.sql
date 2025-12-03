USE OnlineStore_DB;
GO

CREATE PROCEDURE spUsers_Undelete_ById
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET IsDeleted = 0
    WHERE Users.Id = @UserId

    RETURN @@ROWCOUNT;
END;