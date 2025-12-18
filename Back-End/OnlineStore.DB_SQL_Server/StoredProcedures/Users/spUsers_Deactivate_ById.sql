CREATE PROCEDURE spUsers_Deactivate_ById
  @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users
    SET IsActive = 0
    WHERE Users.Id = @UserId;
    
    SELECT @@ROWCOUNT;
END;