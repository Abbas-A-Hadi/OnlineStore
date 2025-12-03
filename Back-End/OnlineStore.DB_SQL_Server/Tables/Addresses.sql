CREATE TABLE Addresses
(
    Id INT NOT NULL IDENTITY,
    FullyAsString VARCHAR(150) NOT NULL,
    PostCode INT NULL, -- Optional
    Street NVARCHAR(30) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId INT NOT NULL,
    CityId INT NOT NULL,
    
    ---- Constraints
    CONSTRAINT PK_Addresses_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT FK_Addresses_CountyId FOREIGN KEY (CountryId) 
        REFERENCES Countries(Id),
    
    CONSTRAINT FK_Addresses_CityId FOREIGN KEY (CityId) 
        REFERENCES Cities(Id),
);