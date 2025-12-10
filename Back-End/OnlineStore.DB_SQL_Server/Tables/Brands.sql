CREATE TABLE Brands
(
    Id SMALLINT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId TINYINT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Brands_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Brands_CountryId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),


    CONSTRAINT UQ_Brands_Name UNIQUE (Name),
);
GO