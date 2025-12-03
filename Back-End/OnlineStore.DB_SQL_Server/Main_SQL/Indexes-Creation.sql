USE OnlineStore_DB;
GO

/*
    ============================
    ===== Indexes Creation =====
    ============================
*/

----////////////////////////
---- Addresses

GO


----////////////////////////
---- People

GO


----////////////////////////
---- Users
CREATE INDEX idx_Users_Active_NotDeleted_On_PersonID 
    ON Users(PersonId)
    WHERE IsActive = 1 AND IsDeleted = 0;
GO

