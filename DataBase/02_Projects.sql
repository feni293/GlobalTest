SELECT
    p.ProjectId,
    p.Name AS ProjectName,
    p.Budget,
    COUNT(ep.EmployeeId) AS EmployeeCount
FROM Projects AS p
LEFT JOIN EmployeeProject AS ep
    ON p.ProjectId = ep.ProjectId
GROUP BY
    p.ProjectId,
    p.Name,
    p.Budget;