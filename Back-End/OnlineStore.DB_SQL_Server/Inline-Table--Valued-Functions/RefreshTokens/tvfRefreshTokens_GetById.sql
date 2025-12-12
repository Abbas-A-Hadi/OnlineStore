CREATE FUNCTION tvfRefreshTokens_GetById(@RefreshTokenId UNIQUEIDENTIFIER)
RETURNS TABLE 
AS 
RETURN 
(
    SELECT 
        rt.Id, rt.Token, rt.ExpirationTime, rt.UserId
    FROM RefreshTokens AS rt
    WHERE rt.Id = @RefreshTokenId
);