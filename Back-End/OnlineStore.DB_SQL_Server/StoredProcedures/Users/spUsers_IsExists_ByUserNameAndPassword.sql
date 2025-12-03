USE OnlineStore_DB;
GO

CREATE PROCEDURE spUsers_IsExists_ByUserNameAndPassword
  @UserName VARCHAR(20),
  @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (
        SELECT 1 
        FROM Users AS u
        WHERE u.UserName = @UserName AND u.Password = @Password
    ) BEGIN
        RETURN 1;
    END;
    
    RETURN 0;
END;