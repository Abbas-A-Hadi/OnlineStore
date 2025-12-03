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