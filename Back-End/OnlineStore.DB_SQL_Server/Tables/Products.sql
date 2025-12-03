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