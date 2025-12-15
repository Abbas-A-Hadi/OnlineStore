CREATE TABLE Brands
(
    Id SMALLINT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    ---- Foreign Keys Attributes
--     CountryId SMALLINT NOT NULL, 
    /* 
        I remove it because have a Many-to-Many relationship.
        Then i have ot create an interconnection table between
          these two table (Brands, Countries) call BrandCountries.
    */

    ---- Constraints
    CONSTRAINT PK_Brands_Id PRIMARY KEY (Id),


--     CONSTRAINT FK_Brands_CountryId FOREIGN KEY (CountryId)
--         REFERENCES Countries(Id),


    CONSTRAINT UQ_Brands_Name UNIQUE (Name),
);
GO