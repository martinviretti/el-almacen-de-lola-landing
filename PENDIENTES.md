# Pendientes antes de publicar

Todo lo de esta lista es propuesta o dato sin confirmar. Validarlo con la encargada o la dueña del local.

## Bloqueantes

| # | Tema | Situación | Dónde se cambia |
|---|---|---|---|
| 1 | **Fotos de Google Maps** | Las 4 fotos del interior (`src/assets/local/mostrador`, `granel-lamparas`, `pasillo`, `exhibidores`) las subieron a Google Maps dos clientas: **Miriam Marto** y **Julia Marquez**. Los derechos son de ellas: subirlas a Maps no autoriza a usarlas en otra web. Pedirles permiso por Maps o Instagram, o reemplazarlas por fotos propias de las mismas tomas. La galería no muestra créditos (decisión de diseño); si se pide permiso, conviene ofrecerles mencionarlas. | `src/data/site.ts` → `galeria` y `recorridoMovil` (el recorrido del celular usa estas fotos) |
| 2 | **Origen de la fachada** | `fachada.jpg` es una versión retocada ("fachada-limpia"). Confirmar de dónde salió la foto original y que se pueda usar. | `src/assets/local/fachada.jpg` |
| 3 | **Video del recorrido** | Sale del reel propio del local. Se usaron solo los tramos sin personas y sin texto, pero conviene que la dueña lo apruebe. | `public/video/recorrido.mp4` |
| 4 | **Dominio** | Provisorio: `el-almacen-de-lola.pages.dev`. | `astro.config.mjs` → `SITE` y `public/robots.txt` |

## Imágenes ilustrativas

Las 10 fotos de categorías y las 3 de la franja "Del almacén a tu mesa" son **generadas**: no muestran el local ni el surtido real. La web lo aclara al pie de cada bloque ("Imágenes ilustrativas"). No usarlas en el recorrido ni en la galería del local.

## Datos a confirmar

- **Preguntas frecuentes** marcadas `pendiente: true`: consulta por Instagram, orgánicos. → `src/data/site.ts` → `preguntas`
- **Categorías** marcadas `pendiente: true`: productos orgánicos. → `categorias`
- **Textos del recorrido**: son propuestas. En particular "mezclas fraccionadas" (granel) y "Yogures, leches vegetales y congelados" (heladeras).
- **Seguidores de Instagram**: 1.747 al 10/10/2026. Actualizarlo cada tanto o sacarlo.
- **Número de WhatsApp**: el botón flotante ya está, pero sin número (abre WhatsApp con el mensaje listo y la persona elige el chat). Cargarlo en `src/data/negocio.ts` → `whatsapp`, con código de país y sin espacios (ej. `5491112345678`).

## Mejoras opcionales

- **Video en mejor calidad**: el reel viene a 480 × 856. Si la encargada tiene el video original del celular, se puede rehacer el recorrido en HD con los mismos tramos.
- **Logo en vector** (AI, PDF, SVG) o PNG grande, para reemplazar el de 150 px.

## Confirmado

- Nombre comercial: **El Almacén de Lola** (11/10/2026).
- El bolsón de verduras ya no se hace: se sacó de categorías, preguntas e historias destacadas (11/10/2026).
- Domingos cerrado (11/10/2026).
- Sin TACC: se aseguran solo los envasados con logo oficial; lo fraccionado en el local no se recomienda a celíacos por contacto cruzado (11/10/2026).
