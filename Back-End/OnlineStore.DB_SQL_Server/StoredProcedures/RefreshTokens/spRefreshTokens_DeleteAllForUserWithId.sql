CREATE PROCEDURE spRefreshTokens_DeleteAllForUserWithId
    @UserId UNIQUEIDENTIFIER
AS
BEGIN 
    SET NOCOUNT ON;
    
    DELETE RefrehTokens
    WHERE UserId = @UserId;
    
    SELECT @@ROWCOUNT;
END;