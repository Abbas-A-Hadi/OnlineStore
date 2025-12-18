CREATE FUNCTION tvfProducts_GetById(@ProductId INT)
RETURNS TABLE 
AS
RETURN
(
    SELECT TOP 1
        p.ProductId,
        p.Name,
        p.Price,
        p.Currency,
        p.Brand,
        p.Category,
        p.ShortDescription,
        p.LongDescription,
        p.Reviews,
        StockStatus =
            CASE
                WHEN p.StockQuantity = 0               THEN 'Stock Is Empty'
                WHEN p.StockQuantity BETWEEN 10 AND 40 THEN 'Only a few left'
                ELSE 'In Stock'
            END,
        p.Features,
        ImagesURLs = STRING_AGG(piu.Url, '||')
    FROM vFullProducts p
         LEFT JOIN ProductsImagesURLs piu
            ON p.ProductId = piu.ProductId
    WHERE p.ProductId = @ProductId
    GROUP BY
        p.ProductId,
        p.Name,
        p.Price,
        p.Currency,
        p.Brand,
        p.Category,
        p.ShortDescription,
        p.LongDescription,
        p.Reviews,
        p.StockQuantity,
        p.Features
);
GO