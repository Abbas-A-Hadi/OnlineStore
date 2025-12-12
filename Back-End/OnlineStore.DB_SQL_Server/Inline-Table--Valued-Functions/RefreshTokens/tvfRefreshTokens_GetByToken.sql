CREATE FUNCTION tvfRefreshTokens_GetByToken(@Token VARCHAR(50))
RETURNS TABLE
AS
RETURN
(
    SELECT
        rt.Id, rt.Token, rt.ExpirationTime, rt.UserId
    FROM RefreshTokens AS rt
    WHERE rt.Token = @Token
);