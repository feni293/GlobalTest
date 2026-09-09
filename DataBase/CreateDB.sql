-- =============================================
-- 1. Create Database
-- =============================================

CREATE DATABASE CompanyDB;
GO

USE CompanyDB;
GO


-- =============================================
-- 2. Create Departments Table
-- =============================================

CREATE TABLE Departments
(
    DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);
GO


-- =============================================
-- 3. Create Employees Table
-- =============================================

CREATE TABLE Employees
(
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(150) NOT NULL,
    HireDate DATE NOT NULL,
    DepartmentId INT NOT NULL,

    CONSTRAINT FK_Employees_Departments
        FOREIGN KEY (DepartmentId)
        REFERENCES Departments(DepartmentId)
);
GO


-- =============================================
-- 4. Create Projects Table
-- =============================================

CREATE TABLE Projects
(
    ProjectId INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    Budget DECIMAL(18,2) NOT NULL,
    StartDate DATE NOT NULL
);
GO


-- =============================================
-- 5. Create EmployeeProject Table
-- =============================================

CREATE TABLE EmployeeProject
(
    EmployeeId INT NOT NULL,
    ProjectId INT NOT NULL,

    CONSTRAINT PK_EmployeeProject
        PRIMARY KEY (EmployeeId, ProjectId),

    CONSTRAINT FK_EmployeeProject_Employees
        FOREIGN KEY (EmployeeId)
        REFERENCES Employees(EmployeeId),

    CONSTRAINT FK_EmployeeProject_Projects
        FOREIGN KEY (ProjectId)
        REFERENCES Projects(ProjectId)
);
GO