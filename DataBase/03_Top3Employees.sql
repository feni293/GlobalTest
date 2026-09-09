SELECT TOP 3
    e.EmployeeId,
    e.FirstName,
    e.LastName,
    COUNT(ep.ProjectId) AS ProjectCount
FROM Employees AS e
INNER JOIN EmployeeProject AS ep
    ON e.EmployeeId = ep.EmployeeId
GROUP BY
    e.EmployeeId,
    e.FirstName,
    e.LastName
ORDER BY
    ProjectCount DESC;