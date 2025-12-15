--USE OnlineStore_DB;
--GO

/*
    ===========================
    ===== Tables Creation =====
    ===========================
*/

CREATE TABLE Countries
(
    Id TINYINT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Countries_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Countries_Name UNIQUE (Name),
);
GO

----////////////////////////////

CREATE TABLE Cities
(
    Id SMALLINT NOT NULL IDENTITY,
    Name VARCHAR(100) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId TINYINT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Cities_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Cities_CountryId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),


    CONSTRAINT UQ_Cities_CountryId_Name UNIQUE (CountryId, Name),
);
GO

----////////////////////////////

CREATE TABLE Addresses
(
    Id INT NOT NULL IDENTITY,
    FullyAsString VARCHAR(150) NOT NULL,
    PostCode INT NULL, -- Optional
    --Street NVARCHAR(30) NOT NULL, -- I remove it because it stored in FullyAsString Attribute.
    ---- Foreign Keys Attributes
    CountryId TINYINT NOT NULL,
    CityId SMALLINT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Addresses_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Addresses_CountyId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),

    CONSTRAINT FK_Addresses_CityId FOREIGN KEY (CityId)
        REFERENCES Cities(Id),
);
GO
--DELETE FROM RefreshTokens;
----////////////////////////////
SELECT * FROM dbo.tvfUsers_GetAllActiveUsers();
SELECT * FROM RefreshTokens;
--DELETE FROM DBO.UserS WHERE Users.Id = 'b055e0c5-09b2-4c8a-970b-e66cf815d6de';
--UPDATE Users SET IsDeleted = 0;
--DELETE FROM Users WHERE Email LIKE 'test2@%'
CREATE TABLE Users
(
    Id UNIQUEIDENTIFIER NOT NULL,
    Email VARCHAR(40) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    DateOfBirth Date NOT NULL,
    Role TINYINT NOT NULL CONSTRAINT DF_Users_Role DEFAULT 0, ---- 0: User, 1: Admin, ....
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT GETDATE(),
    IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
    IsDeleted BIT NOT NULL CONSTRAINT DF_Users_IsDeleted DEFAULT 0, -- For Soft Deletion.


    ---- Constraints
    CONSTRAINT PK_Users_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Users_Email UNIQUE (Email),


    CONSTRAINT CH_Users_Email_NotEmpty CHECK (LEN(Email) > 0),
    CONSTRAINT CH_Users_Password_NotEmpty CHECK (LEN(PasswordHash) > 0),
    CONSTRAINT CH_Users_FirstName_NotEmptyOrLessThenTwo CHECK (LEN(FirstName) > 2),
    CONSTRAINT CH_Users_LastName_NotEmptyOrLessThenTwo CHECK (LEN(LastName) > 2),
    CONSTRAINT CH_Users_DateOfBirth_MoreOrEqualTo18Years
        CHECK (DateOfBirth <= DATEADD(YEAR, -18, GETDATE())),

    ---- This syntax will not work such as other constraints syntax.
    ----  the correct one is to write it as the above
    -- CONSTRAINT DF_Users_IsDeleted DEFAULT 0 FOR IsDeleted
);
--GO

-- -- I have used this way to add 'IsActive' column to 'Users' table because i had created 'Users' table 
-- --   and SQL Server prevent me to modify the 'Users' table.
-- --   So because of that i written it in query of creating 'Users' table.
-- ALTER TABLE Users
-- ADD IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1; 
-- GO
GO

----////////////////////////////

CREATE TABLE RefreshTokens
(
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_RefreshTokens_Id DEFAULT NEWSEQUENTIALID(),
    Token VARCHAR(90) NOT NULL,
    ExpirationTime DATETIME2(3) NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    
    -- Constraints.
    CONSTRAINT PK_RefreshTokens_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT FK_RefreshTokens_Users_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),
    
    
    CONSTRAINT UQ_RefreshTokens_Token UNIQUE (Token),
    
    
    CONSTRAINT CH_RefreshTokens_Token_NotEmpty CHECK (LEN(Token) > 0),
);
GO

----////////////////////////////

CREATE TABLE Categories
(
    Id TINYINT NOT NULL IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(500) NOT NULL

    ---- Constraints
    CONSTRAINT PK_Categories_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Categories_Name UNIQUE (Name),
);
GO

----////////////////////////////

CREATE TABLE Brands
(
    Id SMALLINT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId TINYINT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Brands_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Brands_CountryId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),


    CONSTRAINT UQ_Brands_Name UNIQUE (Name),
);
GO

----////////////////////////////

CREATE TABLE Products
(
    Id INT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Currency VARCHAR(3) NOT NULL CONSTRAINT DF_Products_Currency DEFAULT 'USD',
    StockQuantity INT NOT NULL,
    ---- Foreign Keys Attributes
    CategoryId TINYINT NOT NULL,
    BrandId SMALLINT NOT NULL,
--     SupplierId INT NOT NULL, -- For Later Updates.

    ---- Constraints
    CONSTRAINT PK_Products_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Products_CategoryId FOREIGN KEY (CategoryId)
        REFERENCES Categories(Id),

    CONSTRAINT FK_Products_BrandId FOREIGN KEY (BrandId)
        REFERENCES Brands(Id),

--     CONSTRAINT FK_Products_SupplierId FOREIGN KEY (SupplierId)
--         REFERENCES Suppliers(Id), -- For Later Updates.


    CONSTRAINT UQ_Products_Name UNIQUE (Name),


    CONSTRAINT CH_Products_Currency_MustItConsistOfThreeLetters CHECK (LEN(Currency) = 3),
    CONSTRAINT CH_Products_Price_MoreThenZero CHECK (Price > 0),

    CONSTRAINT CH_Products_StockQuantity_MoreThenOrEqualZero CHECK (StockQuantity >= 0),
);
GO

----////////////////////////////

CREATE TABLE Carts
(
    Id INT NOT NULL,
    CreatedAt DATETIME2(3) NOT NULL,
    ---- Foreign Keys Attributes
    UserId UNIQUEIDENTIFIER NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Carts_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Carts_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),
);
GO

----////////////////////////////

CREATE TABLE CartItems
(
    Id INT NOT NULL IDENTITY,
    Quantity INT NOT NULL,
    ---- Foreign Keys Attributes
    CartId INT NOT NULL,
    ProductId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_CartItems_Id PRIMARY KEY (Id),


    CONSTRAINT FK_CartItems_CartId FOREIGN KEY (CartId)
        REFERENCES Carts(Id),

    CONSTRAINT FK_CartItems_ProductId FOREIGN KEY (ProductId)
        REFERENCES Products(Id),


    CONSTRAINT CH_CartItems_Quantity_MoreThenZero CHECK (Quantity > 0),
);
GO

----////////////////////////////

CREATE TABLE ProductsImagesURLs
(
    Id INT NOT NULL IDENTITY,
    Url VARCHAR(75) NOT NULL, -- In future it will be 75 size.
    ---- Foreign Keys Attributes
    ProductId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_ProductsImagesURLs_Id PRIMARY KEY (Id),

    CONSTRAINT FK_ProductsImagesURLs_ProductId FOREIGN KEY (ProductId)
        REFERENCES Products(Id)
);
/*
    C:/Users/myUser/OnlineStore/Images/ProductImageName.jpeg
    
    ProductImageName it will be a GUID.
    GUID as string will be 36 characters, example: f8d66900-e3cd-473c-9ef4-6674663828eb
    
    Then it will be X of characters.
    X = 2 + 1 + 5 + 1 + 5 + 1 + 11 + 1 + 6 + 36 (GUID as string) + 1 + 4
    X = 75.
    
    Example on it: 
        C:/Users/myUser/OnlineStore/Images/f8d66900-e3cd-473c-9ef4-6674663828eb.jpeg
*/
GO

----////////////////////////////

CREATE TABLE Reviews
(
    Id INT NOT NULL IDENTITY,
    Rating INT NOT NULL,
    Comment NVARCHAR(999) NOT NULL,
    CreatedAt DATETIME2(3) NOT NULL,
    ---- Foreign Keys Attributes
    UserID UNIQUEIDENTIFIER NOT NULL,
    ProductID INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Reviews_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Reviews_ProductId FOREIGN KEY (ProductId)
        REFERENCES Products(Id),

    CONSTRAINT FK_Reviews_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),
);
GO

----////////////////////////////

CREATE TABLE Orders
(
    Id INT NOT NULL,
    CreationDate DATETIME2(3) NOT NULL,
    Status TINYINT NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    ---- Foreign Keys Attributes
    UserId UNIQUEIDENTIFIER NOT NULL,
    AddressId INT NOT NULL,
--     ShippingId INT NOT NULL, -- For Later Updates. And i Will ove it to Shippings Table.

    ---- Constraints
    CONSTRAINT PK_Orders_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Orders_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),

    CONSTRAINT FK_Orders_AddressId FOREIGN KEY (AddressId)
        REFERENCES Addresses(Id),

--     CONSTRAINT FK_Orders_ShippingId FOREIGN KEY (Shipping_Id)
--         REFERENCES Shippings(Id), -- For Later Updates.


    CONSTRAINT CH_Orders_Date_MoreThenZero CHECK (CreationDate <= GETDATE()),

    CONSTRAINT CH_Orders_TotalAmount_MoreThenZero CHECK (TotalAmount > 0),
);

----////////////////////////////

CREATE TABLE Order_Lines
(
    Id INT NOT NULL IDENTITY,
    Quantity TINYINT NOT NULL,
    UnitePrice DECIMAL(10, 2) NOT NULL,

    ---- Foreign Keys Attributes
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_OrderItems_Id PRIMARY KEY (Id),


    CONSTRAINT FK_OrderItems_OrderId FOREIGN KEY (OrderId)
        REFERENCES Orders(Id),

    CONSTRAINT FK_OrderItems_ProductId FOREIGN KEY (ProductId)
        REFERENCES Products(Id),


    CONSTRAINT CH_OrderItems_Quantity_MoreThenZero CHECK (Quantity > 0),

    CONSTRAINT CH_OrderItems_UnitePrice_MoreThenZero CHECK (UnitePrice > 0),
);
GO

----////////////////////////////

CREATE TABLE Payments
(
    Id INT NOT NULL,
    Method TINYINT NOT NULL,
    Status TINYINT NOT NULL,
    PaidAt DATETIME2(3) NOT NULL,
    TransactionOperationId BIGINT NOT NULL,
    ---- Foreign Keys Attributes
    OrderId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Payments_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Payments_OrderId FOREIGN KEY (OrderId)
        REFERENCES Orders(Id),
);
GO
