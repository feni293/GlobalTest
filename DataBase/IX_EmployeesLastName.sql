-- =============================================
-- Non-Clustered Index on Employees.LastName
-- =============================================

CREATE NONCLUSTERED INDEX IX_Employees_LastName
ON Employees (LastName);
GO