-- =============================================
-- Stored Procedure: Search Employee
-- =============================================

CREATE PROCEDURE sp_buscar_empleado
    @FirstName VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        e.EmployeeId,
        e.FirstName,
        e.LastName,
        e.Email,
        e.HireDate,
        d.DepartmentId,
        d.Name AS DepartmentName
    FROM Employees AS e
    INNER JOIN Departments AS d
        ON e.DepartmentId = d.DepartmentId
    WHERE e.FirstName = @FirstName;
END;
GO