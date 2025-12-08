CREATE TABLE Categories
(
    Id SMALLINT NOT NULL IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(MAX) NOT NULL

    ---- Constraints
    CONSTRAINT PK_Categories_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT UQ_Categories_Name UNIQUE (Name),    
);