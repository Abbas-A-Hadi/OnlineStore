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