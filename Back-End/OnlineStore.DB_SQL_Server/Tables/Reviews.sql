CREATE TABLE Reviews
(
    Id INT NOT NULL IDENTITY,
    Rating REAL NOT NULL,
    Comment NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2(3) NOT NULL,
    ---- Foreign Keys Attributes
    UserID UNIQUEIDENTIFIER NOT NULL,
    ProductID UNIQUEIDENTIFIER NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Reviews_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Reviews_ProductId FOREIGN KEY (ProductId)
        REFERENCES Products(Id),
    
    CONSTRAINT FK_Reviews_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),
);