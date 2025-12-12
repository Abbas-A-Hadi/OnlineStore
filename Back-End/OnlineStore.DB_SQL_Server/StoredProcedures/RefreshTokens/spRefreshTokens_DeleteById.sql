CREATE PROCEDURE spRefreshTokens_DeleteById
    @RefreshTokenId UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE RefreshTokens
    WHERE Id = @RefreshTokenId;
    
    SELECT @@ROWCOUNT;
END;