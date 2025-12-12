CREATE TABLE RefreshTokens
(
    Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_RefreshTokens_Id DEFAULT NEWSEQUENTIALID(),
    Token VARCHAR(90) NOT NULL,
    ExpirationTime DATETIME2(3) NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,

    -- Constraints.
    CONSTRAINT PK_RefreshTokens_Id PRIMARY KEY (Id),


    CONSTRAINT FK_RefreshTokens_Users_UserId FOREIGN KEY (UserId)
        REFERENCES Users(Id),


    CONSTRAINT UQ_RefreshTokens_Token UNIQUE (Token),
);