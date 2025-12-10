CREATE TABLE Countries
(
    Id TINYINT NOT NULL IDENTITY,
    Name VARCHAR(25) NOT NULL,

    ---- Constraints
    CONSTRAINT PK_Countries_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Countries_Name UNIQUE (Name),
);
GO