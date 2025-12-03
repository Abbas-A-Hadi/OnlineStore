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