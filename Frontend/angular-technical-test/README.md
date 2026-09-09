# Movies & Weather - Prueba Técnica Angular

## Descripción

Aplicación web desarrollada en Angular como solución para una prueba técnica de desarrollo Frontend.

La aplicación permite consultar y explorar:

- Películas populares.
- Búsqueda de películas por nombre.
- Resultados de películas paginados.
- Condiciones climáticas actuales de diferentes ciudades.
- Filtrado de información climática por ciudad.

La interfaz utiliza Angular Material y consume APIs externas mediante servicios independientes.

---

## Funcionalidades

### Películas

- Consulta de películas populares.
- Búsqueda de películas por nombre.
- Paginación de resultados.
- Visualización de póster, título, fecha de lanzamiento, calificación y descripción.
- Indicador de carga durante las peticiones.
- Manejo de errores.
- Botón para reintentar una petición fallida.
- Estado vacío cuando no existen resultados.
- Diseño responsive.

### Clima

- Consulta de condiciones climáticas actuales.
- Información para diferentes ciudades de Colombia.
- Visualización de ciudad, temperatura, estado del clima, icono y velocidad del viento.
- Filtrado por nombre de ciudad.
- Carga diferida de la información climática al seleccionar la pestaña correspondiente.
- Indicador de carga.
- Manejo de errores.
- Botón para reintentar una petición fallida.
- Estado vacío.
- Diseño responsive.

### Interfaz

- Angular Material.
- Tabs para alternar entre Películas y Clima.
- Tablas Material.
- Paginador Material.
- Campos de búsqueda.
- Botones Material.
- Spinner de carga.
- Diseño adaptable para diferentes tamaños de pantalla.

---

## Tecnologías utilizadas

- Angular 17
- TypeScript
- Angular Material
- RxJS
- SCSS
- Jasmine
- Karma

### APIs utilizadas

- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Open-Meteo](https://open-meteo.com/)

---

## Requisitos

Para ejecutar el proyecto se requiere tener instalado:

- Node.js
- npm
- Angular CLI

---

## Instalación

Clonar el repositorio:

    git clone <URL_DEL_REPOSITORIO>

Ingresar al directorio del proyecto:

    cd angular-technical-test

Instalar las dependencias:

    npm install

---

## Configuración de variables de entorno

La aplicación necesita una API Key de TMDB para realizar las consultas de películas.

Configurar el archivo:

    src/environments/environment.ts

Ejemplo:

    export const environment = {
      production: false,
      tmdbApiKey: 'TU_API_KEY_DE_TMDB',
      tmdbBaseUrl: 'https://api.themoviedb.org/3',
      tmdbImageUrl: 'https://image.tmdb.org/t/p/w500',
      weatherApiUrl: 'https://api.open-meteo.com/v1/forecast'
    };

Reemplazar `TU_API_KEY_DE_TMDB` por una API Key válida de TMDB.

> No se recomienda publicar credenciales privadas en repositorios públicos.

---

## Ejecutar la aplicación

Para iniciar el servidor de desarrollo:

    ng serve

Después abrir en el navegador:

    http://localhost:4200/

La aplicación se recargará automáticamente cuando se realicen cambios en los archivos fuente.

---

## Pruebas

Para ejecutar las pruebas unitarias:

    ng test

Para ejecutar las pruebas una sola vez, sin modo watch:

    ng test --watch=false

Las pruebas implementadas cubren principalmente:

- Creación de servicios.
- Creación de componentes.
- Inicialización del componente principal.
- Consulta de películas populares.
- Búsqueda de películas.
- Validación de endpoints HTTP.
- Validación de parámetros enviados a las APIs.
- Consulta de información climática.
- Mapeo de respuestas de la API de clima.
- Componente de tabla de películas.

Las peticiones HTTP son simuladas mediante las herramientas de testing de Angular, evitando realizar llamadas reales durante las pruebas.

---

## Build de producción

Para generar el build de producción:

    ng build

Los archivos generados estarán disponibles dentro del directorio `dist/`.

---

## Arquitectura del proyecto

El proyecto utiliza una arquitectura orientada a funcionalidades, separando modelos, servicios y componentes de presentación.

    src/
    └── app/
        ├── core/
        │   ├── models/
        │   │   ├── city.ts
        │   │   ├── movie.ts
        │   │   └── weather.ts
        │   │
        │   └── services/
        │       ├── movies.service.ts
        │       └── weather.service.ts
        │
        └── features/
            └── home/
                ├── components/
                │   ├── movies-table/
                │   │   ├── movies-table.component.ts
                │   │   ├── movies-table.component.html
                │   │   ├── movies-table.component.scss
                │   │   └── movies-table.component.spec.ts
                │   │
                │   └── weather-table/
                │       ├── weather-table.component.ts
                │       ├── weather-table.component.html
                │       └── weather-table.component.scss
                │
                ├── home.component.ts
                ├── home.component.html
                └── home.component.scss

---

## Separación de responsabilidades

### `core/models`

Contiene las interfaces TypeScript utilizadas para representar la información manejada por la aplicación.

Modelos principales:

- `Movie`
- `MoviesResponse`
- `Weather`
- `WeatherApiResponse`
- `City`

Esto permite mantener tipado fuerte y evitar trabajar con objetos sin estructura definida.

### `core/services`

Contiene los servicios encargados de la comunicación con APIs externas.

#### `MoviesService`

Responsable de:

- Consultar películas populares.
- Buscar películas.
- Gestionar los parámetros enviados a TMDB.
- Tipar las respuestas mediante `MoviesResponse`.

#### `WeatherService`

Responsable de:

- Consultar las condiciones climáticas.
- Enviar las coordenadas de las ciudades.
- Transformar la respuesta de Open-Meteo al modelo utilizado por la aplicación.

De esta manera, la comunicación HTTP no está directamente implementada en los componentes de presentación.

---

## Componentes

### `HomeComponent`

Es el componente principal de la aplicación.

Se encarga de:

- Coordinar la información de películas y clima.
- Gestionar el estado de la aplicación.
- Inicializar la consulta de películas.
- Gestionar la búsqueda de películas.
- Gestionar la paginación.
- Gestionar la búsqueda de ciudades.
- Gestionar los estados de carga.
- Gestionar los estados de error.
- Gestionar los estados vacíos.
- Controlar el cambio entre las pestañas.
- Cargar la información climática de forma diferida.

### `MoviesTableComponent`

Es responsable de la presentación de las películas.

Se encarga de:

- Renderizar la tabla.
- Mostrar los pósteres.
- Mostrar título, fecha y calificación.
- Mostrar información adicional de las películas.
- Renderizar el paginador.
- Emitir los cambios de página hacia `HomeComponent`.

### `WeatherTableComponent`

Es responsable de la presentación de la información climática.

Se encarga de:

- Renderizar la tabla de clima.
- Mostrar la ciudad.
- Mostrar temperatura.
- Mostrar estado climático.
- Mostrar iconos representativos.
- Mostrar velocidad del viento.
- Convertir los códigos climáticos de Open-Meteo en descripciones legibles.

---

## Uso de RxJS

La aplicación utiliza RxJS para manejar operaciones asíncronas y eventos de usuario.

Entre los operadores utilizados se encuentran:

- `debounceTime`: evita realizar peticiones por cada tecla presionada.
- `distinctUntilChanged`: evita procesar nuevamente el mismo valor.
- `switchMap`: permite realizar búsquedas y cancelar solicitudes anteriores cuando el usuario realiza una nueva búsqueda.
- `forkJoin`: permite consultar simultáneamente el clima de varias ciudades.
- `catchError`: permite manejar errores de las peticiones.
- `finalize`: permite actualizar los estados de carga.
- `takeUntilDestroyed`: permite limpiar automáticamente las suscripciones cuando el componente es destruido.

---

## Búsqueda de películas

La búsqueda de películas utiliza un `FormControl` reactivo.

El flujo de búsqueda es:

    Usuario escribe
          ↓
    FormControl
          ↓
    debounceTime
          ↓
    distinctUntilChanged
          ↓
    switchMap
          ↓
    MoviesService
          ↓
    TMDB API
          ↓
    Resultados

Cuando el campo de búsqueda está vacío, la aplicación vuelve a consultar las películas populares.

---

## Paginación de películas

La paginación se realiza utilizando la paginación proporcionada por la API de TMDB.

El flujo es:

    Usuario cambia de página
              ↓
        HomeComponent
              ↓
        MoviesService
              ↓
          TMDB API
              ↓
        Página solicitada
              ↓
      MoviesTableComponent

La paginación también funciona cuando el usuario está realizando una búsqueda.

---

## Carga de información climática

La información climática se carga de manera diferida.

Al iniciar la aplicación no se realizan inmediatamente las peticiones de clima.

La información se solicita cuando el usuario selecciona la pestaña **Clima**.

Actualmente se consultan las siguientes ciudades:

- Bogotá
- Medellín
- Cali
- Cartagena
- Barranquilla

Las peticiones se realizan mediante `forkJoin`.

    Pestaña Clima
          ↓
    HomeComponent
          ↓
    WeatherService
          ↓
    Open-Meteo API
          ↓
    Información climática
          ↓
    WeatherTableComponent

---

## Filtrado de ciudades

Una vez cargada la información climática, el usuario puede filtrar las ciudades mediante el campo de búsqueda.

Por ejemplo:

    Búsqueda:
    bog

    Resultado:
    Bogotá

El filtrado se realiza localmente sobre los datos obtenidos de la API.

---

## Estados de la aplicación

La aplicación contempla diferentes estados para proporcionar feedback al usuario.

### Estado de carga

Mientras se realiza una petición HTTP se muestra un spinner de Angular Material.

### Estado de error

Cuando una petición falla se muestra un mensaje de error y un botón para intentar nuevamente la operación.

### Estado vacío

Cuando una consulta no devuelve resultados se muestra un mensaje indicando que no existen datos disponibles.

### Estado exitoso

Cuando la información es obtenida correctamente se muestra la tabla correspondiente.

---

## Manejo independiente de estados

Las secciones de películas y clima manejan estados independientes.

    Películas
    ├── Loading
    ├── Success
    ├── Error
    └── Empty

    Clima
    ├── Loading
    ├── Success
    ├── Error
    └── Empty

Esto evita que un problema en una API afecte directamente la visualización de la otra funcionalidad.

---

## Diseño responsive

La aplicación está diseñada para adaptarse a diferentes tamaños de pantalla.

En dispositivos con menor ancho disponible, las tablas utilizan desplazamiento horizontal para conservar la información y evitar que las columnas se compriman excesivamente.

También se ajustan:

- Márgenes.
- Padding.
- Tamaño de encabezados.
- Ancho de los elementos de búsqueda.

---

## Angular Material

Angular Material se utiliza para construir los principales elementos de interfaz:

- `MatTable`
- `MatPaginator`
- `MatTabs`
- `MatFormField`
- `MatInput`
- `MatButton`
- `MatProgressSpinner`

Esto permite mantener una interfaz consistente y utilizar componentes con comportamiento y accesibilidad integrados.

---

## Consideraciones de diseño

La aplicación mantiene separadas las responsabilidades de:

- Consumo de APIs.
- Modelado de datos.
- Gestión del estado.
- Presentación de información.
- Interacción con el usuario.

Los componentes de tabla no realizan directamente peticiones HTTP.

Los servicios son responsables de la comunicación con las APIs externas.

Los modelos proporcionan contratos tipados para los datos utilizados por la aplicación.

Esta estructura permite agregar nuevas funcionalidades con un nivel reducido de acoplamiento.

---

## Posibles mejoras

Algunas mejoras que podrían implementarse en una siguiente iteración:

- Aumentar la cobertura de pruebas unitarias.
- Agregar pruebas específicas para búsqueda y filtrado.
- Agregar pruebas de interacción con el paginador.
- Agregar pruebas para la carga diferida del clima.
- Implementar un interceptor HTTP para manejo centralizado de errores.
- Agregar más ciudades.
- Agregar filtros adicionales para películas.
- Mejorar las funcionalidades de accesibilidad.
- Implementar CI/CD.
- Automatizar el deployment.
- Gestionar las credenciales mediante una arquitectura backend o configuración segura del entorno de despliegue.

---

## Autor

Desarrollado como solución para una prueba técnica de Frontend Angular.

---

## Licencia

Este proyecto fue desarrollado exclusivamente con fines de evaluación técnica.