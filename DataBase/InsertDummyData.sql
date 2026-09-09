-- =============================================
-- Insert Departments
-- =============================================

INSERT INTO Departments (Name)
VALUES
    ('Recursos Humanos'),
    ('Tecnología'),
    ('Finanzas'),
    ('Marketing'),
    ('Operaciones');
GO


-- =============================================
-- Insert Employees
-- =============================================

INSERT INTO Employees
    (FirstName, LastName, Email, HireDate, DepartmentId)
VALUES
    ('Clark', 'Kent', 'clark.kent@empresa.com', '2021-03-15', 2),
    ('Bruce', 'Wayne', 'bruce.wayne@empresa.com', '2022-07-10', 2),
    ('Diana', 'Prince', 'diana.prince@empresa.com', '2020-11-05', 3),
    ('Peter', 'Parker', 'peter.parker@empresa.com', '2023-01-20', 1),
    ('Tony', 'Stark', 'tony.stark@empresa.com', '2022-09-12', 5);
GO


-- =============================================
-- Insert Projects
-- =============================================

INSERT INTO Projects
    (Name, Budget, StartDate)
VALUES
    ('Implementación del ERP', 150000.00, '2024-01-15'),
    ('Aplicación Móvil', 85000.00, '2024-03-01'),
    ('Almacén de Datos', 200000.00, '2024-02-10'),
    ('Plataforma de Marketing Digital', 75000.00, '2024-05-20'),
    ('Portal de Clientes', 120000.00, '2024-06-15');
GO


-- =============================================
-- Assign Employees to Projects
-- =============================================

INSERT INTO EmployeeProject (EmployeeId, ProjectId)
VALUES
    -- Clark Kent: 4 projects
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 5),

    -- Bruce Wayne: 3 projects
    (2, 1),
    (2, 2),
    (2, 4),

    -- Diana Prince: 2 projects
    (3, 1),
    (3, 3),

    -- Peter Parker: 1 project
    (4, 4),

    -- Tony Stark: 1 project
    (5, 5);
GO