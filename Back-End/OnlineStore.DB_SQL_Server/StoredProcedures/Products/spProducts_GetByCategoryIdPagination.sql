CREATE PROCEDURE spProducts_GetByCategoryIdPagination
    @CategoryId TINYINT,
    @PageNumber INT,
    @NumberOfRecords INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @ofSetCount INT = (@PageNumber - 1) * @NumberOfRecords;
    
    SELECT *
    FROM vProducts AS p
    WHERE p.CategoryId = @CategoryId
    ORDER BY p.Id
    OFFSET @ofSetCount ROWS
    FETCH NEXT @NumberOfRecords ROWS ONLY;
END;