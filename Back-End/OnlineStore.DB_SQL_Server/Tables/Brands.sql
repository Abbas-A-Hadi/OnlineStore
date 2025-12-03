CREATE TABLE Brands
(
    Id INT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Brands_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT FK_Brands_CountryId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),
    
    
    CONSTRAINT UQ_Brands_Name UNIQUE (Name),
);