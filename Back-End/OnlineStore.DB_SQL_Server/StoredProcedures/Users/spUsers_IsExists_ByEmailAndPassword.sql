CREATE PROCEDURE spUsers_IsExists_ByEmailAndPassword
  @Email VARCHAR(40),
  @PasswordHash VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (
        SELECT 1 
        FROM Users AS u
        WHERE u.Email = @Email AND u.PasswordHash = @PasswordHash
    ) BEGIN
        SELECT 1;
    END;

    SELECT 0;
END;