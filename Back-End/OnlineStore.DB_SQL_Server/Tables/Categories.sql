CREATE TABLE Categories
(
    Id TINYINT NOT NULL IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(500) NOT NULL

        ---- Constraints
        CONSTRAINT PK_Categories_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Categories_Name UNIQUE (Name),
);
GO