CREATE VIEW vFullProducts
AS
(
    SELECT
        p.Id AS [ProductId], 
        p.Name, 
        p.Price, 
        p.CurrencyId, 
        cu.Name AS [Currency],  
        p.BrandId, 
        b.Name AS [Brand],
        p.CategoryId, 
        ca.Name AS [Category],
        p.ShortDescription, 
        p.LongDescription,
        p.Reviews, 
        p.StockQuantity, 
        p.Features
    FROM Products AS p
        INNER JOIN Brands AS b ON p.BrandId = b.Id
        INNER JOIN Categories AS ca ON p.CategoryId = ca.Id
        INNER JOIN Currencies AS cu ON p.CurrencyId = cu.Id
);