CREATE FUNCTION fn_total_proyectos
(
    @EmployeeId INT
)
RETURNS INT
AS
BEGIN
    DECLARE @TotalProjects INT;

    SELECT @TotalProjects = COUNT(*)
    FROM EmployeeProject
    WHERE EmployeeId = @EmployeeId;

    RETURN @TotalProjects;
END;
GO
