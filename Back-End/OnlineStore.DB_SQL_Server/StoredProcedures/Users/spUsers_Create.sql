CREATE PROCEDURE spUsers_Create
    @Id UNIQUEIDENTIFIER,
    @Email VARCHAR(40),
    @PasswordHash VARCHAR(255),
    @FirstName VARCHAR(20),
    @LastName VARCHAR(20),
    @DateOfBirth Date,
    @Role VARCHAR(20) 
AS
BEGIN
    SET NOCOUNT ON;

    -- 0: User, 1: Admin, ....
    DECLARE @roleAsTinyInt TINYINT = dbo.ConvertUserRoleFromVarcharToTinyInt(@Role);
    
    INSERT INTO Users 
        (Id, Email, PasswordHash, FirstName, LastName, DateOfBirth, 
            Role, CreatedAt)
    VALUES 
        (@Id, @Email, @PasswordHash, @FirstName, @LastName, 
         @DateOfBirth, @roleAsTinyInt, GETDATE());
    
    SELECT @@ROWCOUNT;
END;