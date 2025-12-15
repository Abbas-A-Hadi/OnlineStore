CREATE VIEW vProducts
AS
(
    SELECT
        p.Id AS [ProductId], 
        p.Name, p.Description, p.Price, 
        p.Currency, p.StockQuantity, b.Name AS [Brand], 
        c.Name AS [Category]
    FROM Products AS p
        INNER JOIN Brands AS b ON p.BrandId = b.Id
        INNER JOIN Categories AS c ON p.CategoryId = c.Id
);