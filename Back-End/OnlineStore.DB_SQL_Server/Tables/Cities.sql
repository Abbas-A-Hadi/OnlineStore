CREATE TABLE Cities
(
    Id SMALLINT NOT NULL IDENTITY,
    Name VARCHAR(100) NOT NULL,
    ---- Foreign Keys Attributes
    CountryId SMALLINT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Cities_Id PRIMARY KEY (Id),


    CONSTRAINT FK_Cities_CountryId FOREIGN KEY (CountryId)
        REFERENCES Countries(Id),


    CONSTRAINT UQ_Cities_CountryId_Name UNIQUE (CountryId, Name),
);
GO