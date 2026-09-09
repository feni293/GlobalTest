SELECT
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
HAVING COUNT(ep.ProjectId) > 1;