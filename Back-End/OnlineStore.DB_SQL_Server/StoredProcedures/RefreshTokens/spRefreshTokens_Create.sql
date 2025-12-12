CREATE PROCEDURE [dbo].[spRefreshTokens_Create]
    @Id UNIQUEIDENTIFIER,
    @Token VARCHAR(50),
    @ExpirationTime DATETIME2(3),
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    IF NOT EXISTS(
        SELECT 1
        FROM Users AS u
        WHERE u.Id = @UserId
    )
    BEGIN 
        SELECT -1; -- User Is Not Found.
    END;
    
    INSERT INTO RefreshTokens 
        (Id, Token, ExpirationTime, UserId)
    VALUES 
        (@Id, @Token, @ExpirationTime, @UserId);
    
    SELECT @@ROWCOUNT; -- 0 if not inserted; otherwise 1 or more.  
END;