USE OnlineStore_DB;
GO

ALTER PROCEDURE spUsers_Create
    @Id UNIQUEIDENTIFIER,
    @UserName VARCHAR(20),
    @Password VARCHAR(255),
    @Role SMALLINT,
    @CreatedAt DATETIME2(3),
    @FullName VARCHAR(50),
    @Email VARCHAR(50),
    @Phone VARCHAR(12)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Users 
        (Id, UserName, Password, Role, CreatedAt, FullName, Email, Phone)
    VALUES 
        (@Id, @UserName, @Password, @Role, @CreatedAt, @FullName, @Email, @Phone);
    
    RETURN @@ROWCOUNT;
END;