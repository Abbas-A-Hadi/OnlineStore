CREATE PROCEDURE spRefreshTokens_UpdateById
    @Id UNIQUEIDENTIFIER,
    @Token VARCHAR(50),
    @ExpirationTime DATETIME2(3),
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE RefreshTokens
    SET 
        Token = @Token, 
        ExpirationTime = @ExpirationTime, 
        UserId = @UserId
    WHERE Id = @Id;

    SELECT @@ROWCOUNT; -- 0 if not updated; otherwise 1 or more.  
END;