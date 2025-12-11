CREATE PROCEDURE spUsers_Delete_ById
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET IsDeleted = 1
    WHERE Users.Id = @UserId

    SELECT @@ROWCOUNT;
END;