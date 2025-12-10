CREATE TABLE Orders
(
    Id INT NOT NULL,
    CreationDate DATETIME2(3) NOT NULL,
    Status TINYINT NOT NULL,
    TotalAmount REAL NOT NULL,
    ---- Foreign Keys Attributes
    UserId UNIQUEIDENTIFIER NOT NULL,
    AddressId INT NOT NULL,
--     ShippingId UNIQUEIDENTIFIER NOT NULL, -- For Later Updates. And i Will ove it to Shippings Table.

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