CREATE TABLE Categories
(
    Id TINYINT NOT NULL IDENTITY,
    Name VARCHAR(15) NOT NULL,
    Description VARCHAR(200) NOT NULL

    ---- Constraints
    CONSTRAINT PK_Categories_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Categories_Name UNIQUE (Name),
);
GO