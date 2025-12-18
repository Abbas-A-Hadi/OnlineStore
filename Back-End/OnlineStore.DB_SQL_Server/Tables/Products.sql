CREATE TABLE Products
(
    Id INT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Price DECIMAL(9, 2) NOT NULL, -- 9,999,999.99
    CurrencyId SMALLINT NOT NULL CONSTRAINT DF_Products_Currency DEFAULT 1, -- 1: AED, 59: IQD, 132: USD, ....
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


    CONSTRAINT CH_Products_Price_MoreThenZero CHECK (Price > 0),

    CONSTRAINT CH_Products_StockQuantity_MoreThenOrEqualZero CHECK (StockQuantity >= 0),
);