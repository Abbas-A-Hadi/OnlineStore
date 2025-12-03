CREATE PROCEDURE spUsers_Update
    @Id UNIQUEIDENTIFIER,
    @UserName VARCHAR(20),
    @Password VARCHAR(255),
    @Role SMALLINT,
    @FullName VARCHAR(50),
    @Email VARCHAR(50),
    @Phone VARCHAR(12)
AS
BEGIN 
    SET NOCOUNT ON;
    
    UPDATE Users
    SET 
        UserName = @UserName,
        Password = @Password,
        Role = @Role,
        FullName = @FullName,
        Email = @Email,
        Phone = @Phone
    WHERE Id = @Id;
    
    RETURN @@ROWCOUNT;
END;