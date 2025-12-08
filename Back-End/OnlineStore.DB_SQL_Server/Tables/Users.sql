CREATE TABLE Users
(
    ---- Main Attributes
    Id UNIQUEIDENTIFIER NOT NULL,
    Email VARCHAR(40) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    DateOfBirth Date NOT NULL,
    CreatedAt DATETIME2(3) NOT NULL,
    IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
    IsDeleted BIT NOT NULL CONSTRAINT DF_Users_IsDeleted DEFAULT 0, -- For Soft Deletion.

    -- Foreign Keys Attribute
    PersonId UNIQUEIDENTIFIER NOT NULL,
    
    
    ---- Constraints
    CONSTRAINT PK_Users_Id PRIMARY KEY (Id),
    
    
    CONSTRAINT FK_Users_PersonId FOREIGN KEY (PersonId)
        REFERENCES People(Id),
    
    
    CONSTRAINT UQ_Users_Email UNIQUE (Email),
    ---- This syntax will not work such as other constraints syntax.
    ----  the correct one is to write it as the above
    -- CONSTRAINT DF_Users_IsDeleted DEFAULT 0 FOR IsDeleted
);
GO

-- -- I have used this way to add 'IsActive' column to 'Users' table because i had created 'Users' table 
-- --   and SQL Server prevent me to modify the 'Users' table.
-- --   So because of that i written it in query of creating 'Users' table.
-- ALTER TABLE Users
-- ADD IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1; 
-- GO