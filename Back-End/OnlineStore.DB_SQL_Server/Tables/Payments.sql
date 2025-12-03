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