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