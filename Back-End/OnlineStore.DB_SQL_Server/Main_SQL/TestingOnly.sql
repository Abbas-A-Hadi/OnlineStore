--DELETE FROM RefreshTokens;
SELECT * FROM dbo.tvfUsers_GetAllActiveUsers();
SELECT * FROM RefreshTokens;
--DELETE FROM DBO.UserS WHERE Users.Id = 'b055e0c5-09b2-4c8a-970b-e66cf815d6de';
--UPDATE Users SET IsDeleted = 0;
--DELETE FROM Users WHERE Email LIKE 'test2@%'