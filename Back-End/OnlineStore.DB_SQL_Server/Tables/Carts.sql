CREATE TABLE Carts
(
    Id UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2(3) NOT NULL,
    ---- Foreign Keys Attributes
    UserId UNIQUEIDENTIFIER NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Carts_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT FK_Carts_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),
);