CREATE TABLE Addresses
(
    Id INT NOT NULL IDENTITY,
    FullyAsString VARCHAR(150) NOT NULL,
    PostCode INT NULL, -- Optional
    --Street NVARCHAR(30) NOT NULL, -- I remove it because it stored in FullyAsString Attribute.
    ---- Foreign Keys Attributes
    CountryId TINYINT NOT NULL,
    CityId SMALLINT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Addresses_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Addresses_CountyId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),

    CONSTRAINT FK_Addresses_CityId FOREIGN KEY (CityId)
        REFERENCES Cities(Id),
);
GO