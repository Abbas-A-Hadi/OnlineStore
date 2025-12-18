CREATE FUNCTION tvfProducts_GetByCategoryIdPagination(
    @CategoryId TINYINT,
    @PageNumber INT,
    @PageSize INT
)
RETURNS TABLE
AS
RETURN
(
    WITH PaginatedProducts AS
         (
             SELECT
                 fp.*,
                 ROW_NUMBER() OVER (ORDER BY fp.ProductId) AS RowNum
             FROM vFullProducts fp
             WHERE fp.CategoryId = @CategoryId
         )
    SELECT
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
        STRING_AGG(piu.Url, '||') AS ImagesURLs
    FROM PaginatedProducts p
         LEFT JOIN ProductsImagesURLs piu
                   ON p.ProductId = piu.ProductId
    WHERE p.RowNum BETWEEN
          ((@PageNumber - 1) * @PageSize + 1) AND (@PageNumber * @PageSize)
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