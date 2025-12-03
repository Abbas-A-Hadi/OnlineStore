CREATE TABLE Suppliers
(
    Id INT NOT NULL IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Phone VARCHAR(11) NOT NULL,
    ---- Foreign Keys Attributes
    AddressId INT NOT NULL,
    
    ---- Constraints
    CONSTRAINT PK_Suppliers_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT FK_Suppliers_AddressId FOREIGN KEY (AddressId) 
        REFERENCES Addresses(Id),
    
    
    CONSTRAINT UQ_Users_UserName UNIQUE (Name),
    CONSTRAINT UQ_Users_Email UNIQUE (Email),
    CONSTRAINT UQ_Users_Phone UNIQUE (Phone),
); -- For Future Updates.