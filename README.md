# NoeSaApp

Aplicación de React y Vite para registrar artistas y gestionar las presentaciones de un festival musical con JSON Server.

## Ejecutar el proyecto

Con Node.js 22.12 o posterior, abre una terminal en la carpeta que contiene `package.json`. Instala las dependencias e inicia la API.

```sh
npm install --include=dev
npm run api
```

Deja la API abierta. En una segunda terminal, ejecuta `npm run dev` y abre la dirección local que imprime Vite. Para generar la versión de producción, ejecuta `npm run build`.

## Trabajo en equipo

| Integrante | Responsabilidad |
| --- | --- |
| 1 | Configurar la API simulada y desarrollar el módulo de artistas. |
| 2 | Desarrollar el listado, el formulario y la eliminación de presentaciones en `feature/presentaciones`. |
| 3 | Integrar los módulos, consultar presentaciones por artista y probar las peticiones en Postman. |

## Módulo de presentaciones

En **Registrar presentación**, elige un artista y completa escenario, fecha y hora. La **Agenda del festival** muestra las actuaciones en orden cronológico. Cada fila permite confirmar o cancelar la eliminación de esa presentación.

| Petición | Uso |
| --- | --- |
| `GET /artistas` | Cargar el selector de artistas. |
| `GET /presentaciones` | Mostrar la agenda. |
| `POST /presentaciones` | Registrar una presentación con el identificador del artista seleccionado. |
| `DELETE /presentaciones/:id` | Eliminar la presentación seleccionada. |

`FormularioPresentacion.jsx` envía el `id` numérico del artista en `artistaId`. `ListaPresentaciones.jsx` elimina por el `id` de la actuación. Ambos componentes usan `services/presentacionesService.js`. Cuando la API confirma una operación, la agenda vuelve a consultar los datos.

## API simulada (JSON Server)

La API usa `json-server` 0.17.4 con los datos de `db.json`. Se levanta con `npm run api` en `http://localhost:3001`. Para usar otra dirección, define `VITE_API_URL` en `.env.local` y reinicia Vite. Los servicios comparten la función `request` de `src/services/api.js`.

| Recurso | Campos |
| --- | --- |
| `/artistas` | `id` (número), `nombre`, `genero`, `pais` |
| `/presentaciones` | `id` (número), `artistaId` (número, id de un artista), `escenario`, `fecha` (`AAAA-MM-DD`), `hora` (`HH:MM`) |

Módulo de artistas: `FormularioArtista.jsx` (POST `/artistas`, con validaciones y mensajes) y `ListaArtistas.jsx` (GET `/artistas`), ambos apoyados en `services/artistasService.js`.
