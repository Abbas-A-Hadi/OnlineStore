USE OnlineStore_DB;
GO

/*
    ===========================
    ===== Tables Creation =====
    ===========================
*/

CREATE TABLE Countries
(
    Id INT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Countries_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Countries_Name UNIQUE (Name),
);
GO

----////////////////////////////

CREATE TABLE Cities
(
    Id INT NOT NULL IDENTITY,
    Name VARCHAR(100) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId INT NOT NULL,

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
    Street NVARCHAR(30) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId INT NOT NULL,
    CityId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Addresses_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Addresses_CountyId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),

    CONSTRAINT FK_Addresses_CityId FOREIGN KEY (CityId)
        REFERENCES Cities(Id),
);
GO

----////////////////////////////

CREATE TABLE People
(
    Id UNIQUEIDENTIFIER NOT NULL,
    FullName VARCHAR(50) NOT NULL,
    DateOfBirth DATETIME2 NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    AddressId INT NULL, -- Foreign Keys Attribute.
    IsDeleted BIT NOT NULL CONSTRAINT DF_People_IsDeleted DEFAULT 0, -- For Soft Deletion.


    ---- Constraints
    CONSTRAINT PK_People_Id PRIMARY KEY (Id),


    CONSTRAINT FK_People_AddressId FOREIGN KEY (AddressId)
        REFERENCES Addresses(Id),


    CONSTRAINT UQ_People_FullName UNIQUE (FullName),
    CONSTRAINT UQ_People_Email UNIQUE (Email),
    CONSTRAINT UQ_People_Phone UNIQUE (Phone),


    CONSTRAINT CH_People_DateOfBirth_18YearsOld CHECK (
        DateOfBirth <= GETDATE() - 18
        ),
);
GO

----////////////////////////////

CREATE TABLE Users
(
    ---- Main Attributes
    Id UNIQUEIDENTIFIER NOT NULL,
    UserName VARCHAR(20) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role SMALLINT NOT NULL, -- Customer = 0, Admin = 1, etc... 
    CreatedAt DATETIME2(3) NOT NULL,
    IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
    IsDeleted BIT NOT NULL CONSTRAINT DF_Users_IsDeleted DEFAULT 0, -- For Soft Deletion.

    -- Foreign Keys Attribute
    PersonId UNIQUEIDENTIFIER NOT NULL,


    ---- Constraints
    CONSTRAINT PK_Users_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Users_PersonId FOREIGN KEY (PersonId)
        REFERENCES People(Id),


    CONSTRAINT UQ_Users_UserName UNIQUE (UserName),


    CONSTRAINT CH_Users_UserName CHECK (UserName LIKE '@%'),

    ---- This syntax will not work such as other constraints syntax.
    ----  the correct one is to write it as the above
    -- CONSTRAINT DF_Users_IsDeleted DEFAULT 0 FOR IsDeleted
);
-- GO

-- -- I have used this way to add 'IsActive' column to 'Users' table because i had created 'Users' table 
-- --   and SQL Server prevent me to modify the 'Users' table.
-- --   So because of that i written it in query of creating 'Users' table.
-- ALTER TABLE Users
-- ADD IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1; 
-- GO
GO

----////////////////////////////

CREATE TABLE Categories
(
    Id INT NOT NULL IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(MAX) NOT NULL

    ---- Constraints
    CONSTRAINT PK_Categories_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Categories_Name UNIQUE (Name),
);
GO

----////////////////////////////

CREATE TABLE Brands
(
    Id INT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId INT NOT NULL,

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
    Id UNIQUEIDENTIFIER NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(MAX) NOT NULL,
    Price REAL NOT NULL,
    StockQuantity INT NOT NULL,
    ---- Foreign Keys Attributes
    CategoryId INT NOT NULL,
    BrandId INT NOT NULL,
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


    CONSTRAINT CH_Products_Price_MoreThenZero CHECK (Price > 0),

    CONSTRAINT CH_Products_StockQuantity_MoreThenOrEqualZero CHECK (StockQuantity >= 0),
);
GO

----////////////////////////////

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
GO

----////////////////////////////

CREATE TABLE CartItems
(
    Id INT NOT NULL IDENTITY,
    Quantity INT NOT NULL,
    ---- Foreign Keys Attributes
    CartId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER NOT NULL,

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
    ProductId UNIQUEIDENTIFIER NOT NULL,

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
GO

----////////////////////////////

CREATE TABLE Orders
(
    Id UNIQUEIDENTIFIER NOT NULL,
    Date DATETIME2(3) NOT NULL,
    Status SMALLINT NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    ---- Foreign Keys Attributes
    UserId UNIQUEIDENTIFIER NOT NULL,
--     ShippingId UNIQUEIDENTIFIER NOT NULL, -- For Later Updates.

    ---- Constraints
    CONSTRAINT PK_Orders_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Orders_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),

--     CONSTRAINT FK_Orders_ShippingId FOREIGN KEY (Shipping_Id)
--         REFERENCES Shippings(Id), -- For Later Updates.


    CONSTRAINT CH_Orders_Date_MoreThenZero CHECK (Date <= GETDATE()),

    CONSTRAINT CH_Orders_TotalAmount_MoreThenZero CHECK (TotalAmount > 0),
);
GO

----////////////////////////////

CREATE TABLE Order_Lines
(
    Id INT NOT NULL IDENTITY,
    Quantity INT NOT NULL,
    UnitePrice REAL NOT NULL,

    ---- Foreign Keys Attributes
    OrderId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER NOT NULL,

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
    Id UNIQUEIDENTIFIER NOT NULL,
    Method SMALLINT NOT NULL,
    Status SMALLINT NOT NULL,
    PaidAt DATETIME2(3) NOT NULL,
    Transaction_Id UNIQUEIDENTIFIER NOT NULL,
    ---- Foreign Keys Attributes
    OrderId UNIQUEIDENTIFIER NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Payments_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Payments_OrderId FOREIGN KEY (OrderId)
        REFERENCES Orders(Id),
);
GO

----////////////////////////////

CREATE TABLE Transactions
(
    Id UNIQUEIDENTIFIER NOT NULL,
    CT VARCHAR(MAX) NOT NULL,
    
    ---- Constraints
    CONSTRAINT PK_Transactions_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT UQ_Transactions_CT UNIQUE (CT),
);
GO
