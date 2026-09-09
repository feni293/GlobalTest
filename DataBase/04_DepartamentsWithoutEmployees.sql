SELECT
    d.DepartmentId,
    d.Name AS DepartmentName
FROM Departments AS d
LEFT JOIN Employees AS e
    ON d.DepartmentId = e.DepartmentId
WHERE e.EmployeeId IS NULL;