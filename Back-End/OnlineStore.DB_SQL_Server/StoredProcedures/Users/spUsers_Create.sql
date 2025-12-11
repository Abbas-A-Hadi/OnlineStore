ALTER PROCEDURE spUsers_Create
    @Id UNIQUEIDENTIFIER,
    @FirstName VARCHAR(20),
    @LastName VARCHAR(20),
    @Email VARCHAR(40),
    @PasswordHash VARCHAR(255),
    @Role VARCHAR(20), 
    @DateOfBirth Date,
    @RefreshToken VARCHAR(50),
    @RefreshTokenExpirationTime DATETIME2(3)
AS
BEGIN
    SET NOCOUNT ON;

    -- 0: User, 1: Admin, ....
    DECLARE @roleAsTinyInt TINYINT = dbo.ConvertUserRoleFromVarcharToTinyInt(@Role);
    
    INSERT INTO Users 
        (Id, FirstName, LastName, Email, PasswordHash, DateOfBirth, 
            Role, RefreshToken, RefreshTokenExpirationTime, CreatedAt)
    VALUES 
        (@Id, @FirstName, @LastName, @Email, @PasswordHash, @DateOfBirth, 
            @roleAsTinyInt, @RefreshToken, @RefreshTokenExpirationTime, GETDATE());
    
    SELECT @@ROWCOUNT;
END;