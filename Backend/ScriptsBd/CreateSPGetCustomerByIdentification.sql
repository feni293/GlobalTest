USE DBClientes;
GO

CREATE PROCEDURE dbo.GetCustomerByIdentification
    @Identification VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Id,
        Identification,
        FirstName,
        LastName,
        Email,
        Phone
    FROM Customers
    WHERE Identification = @Identification;
END;
GO