CREATE TABLE Users
(
    Id UNIQUEIDENTIFIER NOT NULL,
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    Email VARCHAR(40) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role TINYINT NOT NULL, ---- 0: User, 1: Admin, ....
    DateOfBirth Date NOT NULL,
    RefreshToken VARCHAR NULL,
    RefreshTokenExpirationTime DATETIME2(3) NULL,
    CreatedAt DATETIME2(3) NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT GETDATE(),
    IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
    IsDeleted BIT NOT NULL CONSTRAINT DF_Users_IsDeleted DEFAULT 0, -- For Soft Deletion.


    ---- Constraints
    CONSTRAINT PK_Users_Id PRIMARY KEY (Id),


    CONSTRAINT UQ_Users_Email UNIQUE (Email),


    CONSTRAINT CH_Users_Email_NotEmpty CHECK (LEN(Email) > 0),
    CONSTRAINT CH_Users_Password_NotEmpty CHECK (LEN(PasswordHash) > 0),
    CONSTRAINT CH_Users_FirstName_NotEmptyOrLessThenTwo CHECK (LEN(FirstName) > 2),
    CONSTRAINT CH_Users_LastName_NotEmptyOrLessThenTwo CHECK (LEN(LastName) > 2),
    CONSTRAINT CH_Users_DateOfBirth_MoreOrEqualTo18Years
        CHECK (DateOfBirth <= DATEADD(YEAR, -18, GETDATE())),

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
