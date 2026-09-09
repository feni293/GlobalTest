SELECT
    e.EmployeeId,
    e.FirstName,
    e.LastName,
    e.Email,
    e.HireDate,
    d.Name AS DepartmentName
FROM Employees AS e
INNER JOIN Departments AS d
    ON e.DepartmentId = d.DepartmentId;