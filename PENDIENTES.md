# Pendientes antes de publicar

Todo lo de esta lista es propuesta o dato sin confirmar. Validarlo con la encargada o la dueña del local.

## Bloqueantes

| # | Tema | Situación | Dónde se cambia |
|---|---|---|---|
| 1 | **Fotos de Google Maps** | Las 4 fotos del interior (`src/assets/local/mostrador`, `granel-lamparas`, `pasillo`, `exhibidores`) las subieron a Google Maps dos clientas: **Miriam Marto** y **Julia Marquez**. Los derechos son de ellas: subirlas a Maps no autoriza a usarlas en otra web. Pedirles permiso por Maps o Instagram, o reemplazarlas por fotos propias de las mismas tomas. | `src/data/site.ts` → `galeria` |
| 2 | **Origen de la fachada** | `fachada.jpg` es una versión retocada ("fachada-limpia"). Confirmar de dónde salió la foto original y que se pueda usar. | `src/assets/local/fachada.jpg` |
| 3 | **Video del recorrido** | Sale del reel propio del local. Se usaron solo los tramos sin personas y sin texto, pero conviene que la dueña lo apruebe. | `public/video/recorrido.mp4` |
| 4 | **Nombre comercial** | La fachada dice "La almacén de Lola", Instagram dice "La Almacen de Lola" y la web dice **"El Almacén de Lola"**. Definir cuál va. | `src/data/negocio.ts` → `nombre` (y `Nav.astro`, `og.jpg`) |
| 5 | **Dominio** | Provisorio: `el-almacen-de-lola.pages.dev`. | `astro.config.mjs` → `SITE` y `public/robots.txt` |

## Imágenes ilustrativas

Las 11 fotos de categorías y las 3 de la franja "Del almacén a tu mesa" son **generadas**: no muestran el local ni el surtido real. La web lo aclara al pie de cada bloque ("Imágenes ilustrativas"). No usarlas en el recorrido ni en la galería del local.

## Datos a confirmar

- **Domingo cerrado**: el perfil solo lista lunes a sábado. → `src/data/negocio.ts` → `horarios`
- **Preguntas frecuentes** marcadas `pendiente: true`: consulta por Instagram, sin TACC, bolsón de verduras, orgánicos. → `src/data/site.ts` → `preguntas`
- **Categorías** marcadas `pendiente: true`: productos orgánicos y bolsón de verduras (¿se sigue haciendo?). → `categorias`
- **Textos del recorrido**: son propuestas. En particular "mezclas fraccionadas" (granel) y "Yogures, leches vegetales y congelados" (heladeras).
- **Seguidores de Instagram**: 1.747 al 10/10/2026. Actualizarlo cada tanto o sacarlo.
- **WhatsApp / teléfono**: no hay. Si se suma, va como botón en el hero y en Visitanos.

## Mejoras opcionales

- **Video en mejor calidad**: el reel viene a 480 × 856. Si la encargada tiene el video original del celular, se puede rehacer el recorrido en HD con los mismos tramos.
- **Logo en vector** (AI, PDF, SVG) o PNG grande, para reemplazar el de 150 px.
