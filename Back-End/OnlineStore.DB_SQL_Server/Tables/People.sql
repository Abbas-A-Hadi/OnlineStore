USE OnlineStore_DB;
GO

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