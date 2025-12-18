CREATE VIEW vAbsProducts
AS
(
    SELECT
        p.Id AS [ProductId], 
        p.Name, 
        p.Price,
        cu.Name AS [Currency], 
        b.Name AS [Brand],
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