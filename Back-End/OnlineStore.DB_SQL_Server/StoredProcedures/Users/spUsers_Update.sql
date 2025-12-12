CREATE PROCEDURE spUsers_Update
    @Id UNIQUEIDENTIFIER,
    @FirstName VARCHAR(20),
    @LastName VARCHAR(20),
    @Email VARCHAR(40),
    @PasswordHash VARCHAR(255),
    @DateOfBirth Date,
    @Role VARCHAR(20)
AS
BEGIN 
    SET NOCOUNT ON;
    
    UPDATE Users
    SET 
        FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email,
        PasswordHash = @PasswordHash,
        DateOfBirth = @DateOfBirth,
        Role = dbo.ConvertUserRoleFromVarcharToTinyInt(@Role)
    WHERE Id = @Id;

    SELECT @@ROWCOUNT;
END;