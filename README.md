# NoeSaApp

Aplicación de React y Vite para administrar artistas y presentaciones de un festival musical. Esta base muestra la pantalla inicial de presentaciones y se puede ejecutar antes de conectar la API.

## Ejecutar el proyecto

Con Node.js 22.12 o posterior, abre una terminal en la carpeta que contiene `package.json` y ejecuta los comandos en orden.

```sh
npm install
npm run dev
```

Abre la dirección local que imprime Vite en la terminal. Para generar la versión de producción, ejecuta `npm run build`.

## Trabajo en equipo

| Integrante | Responsabilidad |
| --- | --- |
| 1 | Configurar la API simulada y desarrollar el módulo de artistas. |
| 2 | Desarrollar el listado, el formulario y la eliminación de presentaciones en `feature/presentaciones`. |
| 3 | Integrar los módulos, consultar presentaciones por artista y probar las peticiones en Postman. |

## Próximo paso del módulo de presentaciones

Los componentes `ListaPresentaciones.jsx` y `FormularioPresentacion.jsx` irán en `src/components/`. El servicio `presentacionesService.js` irá en `src/services/` y concentrará las llamadas con `fetch`.

| Petición prevista | Uso |
| --- | --- |
| `GET /artistas` | Cargar el selector de artistas. |
| `GET /presentaciones` | Mostrar la agenda. |
| `POST /presentaciones` | Registrar una presentación con el identificador del artista seleccionado. |
| `DELETE /presentaciones/:id` | Eliminar la presentación seleccionada. |

Antes de conectar la API, acuerden con el integrante 1 la URL base, los nombres de los campos y el tipo de los identificadores. El modelo propuesto para una presentación incluye `id`, `artistaId`, `escenario`, `fecha` y `hora`. Un mismo artista puede tener varias presentaciones.
