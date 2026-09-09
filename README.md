# Prueba Técnica Backend

## Descripción

Este proyecto fue desarrollado exclusivamente como parte de una **prueba técnica de Backend**.

El objetivo de la prueba es implementar una API REST capaz de consultar la información de un cliente mediante su número de identificación, utilizando una base de datos SQL Server.

La solución implementa:

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server 2019
- CQRS con MediatR
- FluentValidation
- Swagger / OpenAPI
- Stored Procedures
- Arquitectura basada en Domain, Application, Infrastructure y API

> **Importante:** este proyecto fue desarrollado únicamente para fines de evaluación técnica y no pretende ser una aplicación productiva completa.

---

## Objetivo

Permitir la consulta de un cliente mediante su número de identificación.

El endpoint principal es:

`GET /api/clientes/{identification}`

Ejemplo:

`GET /api/clientes/1001001001`

---

## Arquitectura

La solución está dividida en cuatro proyectos:

```text
GlobalTest
│
├── GlobalApi.API
├── GlobalApi.Application
├── GlobalApi.Domain
└── GlobalApi.Infrastructure
```

La separación de proyectos permite mantener las responsabilidades aisladas y facilita el mantenimiento y evolución de la solución.

### Flujo general

```text
HTTP Request
     │
     ▼
    API
     │
     ▼
Application
     │
     ▼
  Domain
     │
     ▼
Infrastructure
     │
     ▼
 SQL Server
```

---

## API

`GlobalApi.API` contiene la capa HTTP de la aplicación.

### Responsabilidades

- Definir los Controllers.
- Recibir las solicitudes HTTP.
- Enviar Queries mediante MediatR.
- Retornar las respuestas HTTP.
- Configurar Swagger.
- Configurar Dependency Injection.
- Manejar excepciones globales.

### Estructura

```text
GlobalApi.API
│
├── Controllers
│   └── CustomersController.cs
│
├── ExceptionHandlers
│   └── GlobalExceptionHandler.cs
│
└── Program.cs
```

El Controller se mantiene delgado y no contiene lógica de negocio ni acceso directo a datos.

---

## Application

`GlobalApi.Application` contiene los casos de uso de la aplicación utilizando el patrón **CQRS**.

### Estructura

```text
GlobalApi.Application
│
├── DTOs
│   └── CustomerDto.cs
│
├── Behaviors
│   └── ValidationBehavior.cs
│
└── Customers
    └── GetCustomerByIdentification
        ├── GetCustomerByIdentificationQuery.cs
        ├── GetCustomerByIdentificationHandler.cs
        └── GetCustomerByIdentificationValidator.cs
```

### Responsabilidades

- Definir Queries y Commands.
- Implementar los Handlers.
- Validar los requests.
- Ejecutar comportamientos mediante el pipeline de MediatR.
- Transformar entidades de dominio a DTOs.

Para esta prueba se implementa la siguiente Query:

`GetCustomerByIdentificationQuery`

---

## Domain

`GlobalApi.Domain` contiene el modelo de dominio y la lógica de negocio.

### Estructura

```text
GlobalApi.Domain
│
├── Entities
│   └── Customer.cs
│
├── Interfaces
│   ├── ICustomerRepository.cs
│   └── ICustomerService.cs
│
└── Services
    └── CustomerService.cs
```

### Responsabilidades

- Definir las entidades del dominio.
- Contener la lógica de negocio.
- Definir las abstracciones necesarias para acceder a información.
- Mantener independencia de Infrastructure y API.

El Domain no tiene conocimiento de:

- SQL Server.
- Entity Framework Core.
- Controllers.
- Swagger.
- HTTP.

---

## Infrastructure

`GlobalApi.Infrastructure` contiene las implementaciones técnicas relacionadas con persistencia.

### Estructura

```text
GlobalApi.Infrastructure
│
├── Data
│   ├── CustomerDbContext.cs
│   │
│   └── Configurations
│       └── CustomerConfiguration.cs
│
└── Repositories
    └── CustomerRepository.cs
```

### Responsabilidades

- Configuración de Entity Framework Core.
- Configuración de entidades mediante Fluent API.
- Conexión con SQL Server.
- Implementación de repositories.
- Ejecución del Stored Procedure.

El acceso a datos sigue el siguiente flujo:

```text
Entity Framework Core
        │
        ▼
Stored Procedure
        │
        ▼
SQL Server
```

---

## CQRS

La aplicación utiliza el patrón **CQRS (Command Query Responsibility Segregation)** para separar las operaciones de lectura y escritura.

En esta prueba solamente se requiere una operación de lectura, por lo que se implementa una Query:

`GetCustomerByIdentificationQuery`

### Flujo de la Query

```text
CustomersController
        │
        ▼
GetCustomerByIdentificationQuery
        │
        ▼
MediatR
        │
        ▼
GetCustomerByIdentificationHandler
        │
        ▼
CustomerService
        │
        ▼
ICustomerRepository
        │
        ▼
CustomerRepository
        │
        ▼
Entity Framework Core
        │
        ▼
Stored Procedure
        │
        ▼
SQL Server
```

---

## Validación

La validación de las solicitudes se realiza mediante **FluentValidation**.

Para la consulta de clientes se utiliza:

`GetCustomerByIdentificationValidator`

Actualmente se validan:

- Que la identificación sea obligatoria.
- Que la identificación no supere los 20 caracteres.

Las validaciones se ejecutan automáticamente mediante un `ValidationBehavior` registrado en el pipeline de MediatR.

De esta manera, los Handlers no necesitan ejecutar manualmente los validators.

---

## DTOs

La aplicación utiliza DTOs para separar los modelos utilizados por la API de las entidades del dominio.

El DTO utilizado para la respuesta es:

`CustomerDto`

El mapeo de `Customer` a `CustomerDto` se realiza manualmente dentro del Handler.

Esto permite que el Controller reciba directamente el DTO y se mantenga enfocado únicamente en responsabilidades HTTP.

---

## Base de datos

La aplicación utiliza:

**SQL Server 2019**

Base de datos:

`DBClientes`

Tabla:

`Clientes`

### Estructura

```text
Clientes
│
├── Id
├── Identification
├── FirstName
├── LastName
├── Email
└── Phone
```

La consulta del cliente se realiza mediante el Stored Procedure:

`dbo.GetCustomerByIdentification`

El Stored Procedure recibe:

`@Identification`

y retorna la información correspondiente al cliente.

---

## Stored Procedure

El acceso a la información del cliente se realiza mediante el Stored Procedure:

`dbo.GetCustomerByIdentification`

Ejemplo de ejecución:

```sql
EXEC dbo.GetCustomerByIdentification
    @Identification = '1001001001';
```

El Repository utiliza Entity Framework Core para ejecutar el Stored Procedure y materializar el resultado como una entidad `Customer`.

---

## Configuración de Entity Framework Core

La configuración de Entity Framework Core se encuentra en:

```text
Infrastructure/Data
```

El contexto utilizado es:

`CustomerDbContext`

La configuración de la entidad se realiza mediante Fluent API utilizando:

`CustomerConfiguration`

que implementa:

`IEntityTypeConfiguration<Customer>`

Esto permite mantener separada la configuración de persistencia de las entidades del dominio.

---

## Configuración

La aplicación utiliza la configuración estándar de ASP.NET Core para obtener la cadena de conexión:

`ConnectionStrings:DefaultConnection`

Ejemplo para un entorno local:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=DBClientes;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> La cadena anterior es únicamente un ejemplo. Cada entorno debe utilizar su propia configuración de SQL Server.

> No se deben almacenar credenciales, información sensible ni configuraciones específicas de una máquina dentro del repositorio público.

---

## Ejecución

### Requisitos

- Visual Studio 2022.
- .NET 8 SDK.
- SQL Server 2019.
- SQL Server Management Studio (SSMS).

### Pasos

1. Clonar el repositorio.

2. Abrir la solución en Visual Studio 2022.

3. Restaurar los paquetes NuGet.

4. Crear la base de datos `DBClientes`.

5. Crear la tabla `Clientes`.

6. Crear el Stored Procedure `dbo.GetCustomerByIdentification`.

7. Insertar los datos de prueba.

8. Configurar `ConnectionStrings:DefaultConnection`.

9. Establecer `GlobalApi.API` como proyecto de inicio.

10. Ejecutar la aplicación.

---

## Endpoint

### Obtener cliente por identificación

```http
GET /api/clientes/{identification}
```

### Ejemplo

```http
GET /api/clientes/1001001001
```

### Respuesta exitosa

```http
200 OK
```

```json
{
  "id": 1,
  "identification": "1001001001",
  "firstName": "John",
  "lastName": "Perez",
  "email": "john.perez@email.com",
  "phone": "3001234567"
}
```

---

## Cliente no encontrado

Si no existe un cliente con la identificación proporcionada:

```http
404 Not Found
```

---

## Error de validación

Si la identificación no cumple con las reglas definidas:

```http
400 Bad Request
```

Ejemplo:

```json
{
  "status": 400,
  "title": "Validation error",
  "detail": "Identification is required."
}
```

---

## Swagger

La API utiliza **Swagger / OpenAPI** para documentar y probar los endpoints.

Una vez ejecutada la aplicación, Swagger estará disponible mediante la interfaz configurada por ASP.NET Core.

El endpoint disponible es:

```text
GET /api/clientes/{identification}
```

Desde Swagger es posible ejecutar la consulta directamente y visualizar las diferentes respuestas HTTP.

---

## Manejo de errores

La API implementa un manejador global de excepciones utilizando:

`IExceptionHandler`

Las excepciones de validación se transforman en respuestas:

```http
400 Bad Request
```

Mientras que las excepciones no controladas generan:

```http
500 Internal Server Error
```

El objetivo es evitar manejar excepciones individualmente dentro de cada Controller.

---

## Dependency Injection

Las dependencias se registran mediante el contenedor de Dependency Injection de ASP.NET Core.

Entre las principales dependencias registradas se encuentran:

```text
ICustomerRepository
        ↓
CustomerRepository

ICustomerService
        ↓
CustomerService

CustomerDbContext

MediatR

FluentValidation

ValidationBehavior
```

Esto permite desacoplar las abstracciones de sus implementaciones concretas.

---

## Decisiones técnicas

### Domain

La lógica de negocio relacionada con el cliente reside en `Domain`.

De esta forma se evita colocar reglas de negocio dentro de Controllers o Repositories.

### Application

CQRS permite separar los casos de uso de la capa HTTP.

Cada Query o Command puede tener su propio:

- Handler.
- Validator.
- DTO.

### Infrastructure

Infrastructure contiene los detalles de implementación relacionados con SQL Server y Entity Framework Core.

### API

La API se mantiene enfocada en responsabilidades HTTP y delega la ejecución de los casos de uso a MediatR.

### FluentValidation

Las validaciones se mantienen separadas de los Controllers y Handlers mediante Validators y un Pipeline Behavior.

### Fluent API

La configuración de Entity Framework Core se mantiene separada de las entidades del dominio mediante `IEntityTypeConfiguration`.

### Stored Procedure

La consulta solicitada por la prueba se implementa utilizando el Stored Procedure definido en SQL Server.

---

## Alcance

Esta implementación está limitada intencionalmente al alcance de la **prueba técnica de Backend**.

No se han implementado funcionalidades adicionales que no son necesarias para el ejercicio, tales como:

- Autenticación.
- Autorización.
- Paginación.
- Cache.
- Mensajería.
- Microservicios.
- Logging distribuido.
- Docker.
- CI/CD.
- Kubernetes.
- Integraciones externas.
- Arquitectura distribuida.

Estas funcionalidades podrían incorporarse en una aplicación productiva dependiendo de los requerimientos del negocio.

---

## Estructura final

```text
GlobalTest
│
├── GlobalApi.API
│   ├── Controllers
│   │   └── CustomersController.cs
│   │
│   ├── ExceptionHandlers
│   │   └── GlobalExceptionHandler.cs
│   │
│   └── Program.cs
│
├── GlobalApi.Application
│   ├── DTOs
│   │   └── CustomerDto.cs
│   │
│   ├── Behaviors
│   │   └── ValidationBehavior.cs
│   │
│   └── Customers
│       └── GetCustomerByIdentification
│           ├── GetCustomerByIdentificationQuery.cs
│           ├── GetCustomerByIdentificationHandler.cs
│           └── GetCustomerByIdentificationValidator.cs
│
├── GlobalApi.Domain
│   ├── Entities
│   │   └── Customer.cs
│   │
│   ├── Interfaces
│   │   ├── ICustomerRepository.cs
│   │   └── ICustomerService.cs
│   │
│   └── Services
│       └── CustomerService.cs
│
└── GlobalApi.Infrastructure
    ├── Data
    │   ├── CustomerDbContext.cs
    │   │
    │   └── Configurations
    │       └── CustomerConfiguration.cs
    │
    └── Repositories
        └── CustomerRepository.cs
```

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| C# | Lenguaje principal |
| .NET 8 | Framework de desarrollo |
| ASP.NET Core Web API | Desarrollo de API REST |
| Entity Framework Core | Acceso a datos |
| SQL Server 2019 | Base de datos |
| MediatR | Implementación de CQRS |
| FluentValidation | Validación de requests |
| Swagger / OpenAPI | Documentación y pruebas de API |

---

## Nota final

Este repositorio corresponde **exclusivamente a la implementación solicitada para una prueba técnica de Backend**.

El objetivo principal es demostrar conocimientos en:

- Desarrollo de APIs REST.
- C# y .NET.
- SQL Server.
- Entity Framework Core.
- Stored Procedures.
- CQRS.
- MediatR.
- FluentValidation.
- Dependency Injection.
- Separación de responsabilidades.
- Arquitectura por capas.

La solución se mantiene deliberadamente dentro del alcance solicitado por la prueba y no pretende representar una aplicación productiva completa.