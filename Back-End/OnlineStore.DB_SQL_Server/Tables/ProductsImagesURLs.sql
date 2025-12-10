CREATE TABLE ProductsImagesURLs
(
    Id INT NOT NULL IDENTITY,
    Url VARCHAR(75) NOT NULL, -- In future it will be 75 size.
    ---- Foreign Keys Attributes
    ProductId INT NOT NULL,

    ---- Constraints
    CONSTRAINT PK_ProductsImagesURLs_Id PRIMARY KEY (Id),

    CONSTRAINT FK_ProductsImagesURLs_ProductId FOREIGN KEY (ProductId)
        REFERENCES Products(Id)
);
/*
    C:/Users/myUser/OnlineStore/Images/ProductImageName.jpeg
    
    ProductImageName it will be a GUID.
    GUID as string will be 36 characters, example: f8d66900-e3cd-473c-9ef4-6674663828eb
    
    Then it will be X of characters.
    X = 2 + 1 + 5 + 1 + 5 + 1 + 11 + 1 + 6 + 36 (GUID as string) + 1 + 4
    X = 75.
    
    Example on it: 
        C:/Users/myUser/OnlineStore/Images/f8d66900-e3cd-473c-9ef4-6674663828eb.jpeg
*/
