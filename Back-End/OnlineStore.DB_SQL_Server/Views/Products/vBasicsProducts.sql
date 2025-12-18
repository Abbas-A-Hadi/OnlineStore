CREATE VIEW vBasicsProducts
AS
(
    SELECT
        p.Id AS [ProductId], p.Name, p.Price,
        p.CurrencyId, p.StockQuantity, p.Reviews,
        p.BrandId, p.ShortDescription, p.LongDescription,
        p.CategoryId, p.Features
    FROM Products AS p
);