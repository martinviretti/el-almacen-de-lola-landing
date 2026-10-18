# Pendientes antes de publicar

Todo lo de esta lista es propuesta o dato sin confirmar. Validarlo con la encargada o la dueña del local.

## Bloqueantes

| # | Tema | Situación | Dónde se cambia |
|---|---|---|---|
| 1 | **Fotos de Google Maps** | Desde el rediseño (18/10/2026) **ya no se usan**: `04-pasillo`, `05-granel`, `06-mostrador` y `12-exhibidores` eran retoques de fotos que subieron a Google Maps dos clientas (**Miriam Marto** y **Julia Marquez**). Quedan en `../fotos-lola/`. Si se consigue su permiso, se pueden volver a sumar (conviene ofrecerles mencionarlas). | — |
| 2 | **Fachada retocada con IA** | Ya no se usa: la portada usa la foto real de la entrada (`03-entrada`) y "Visitanos", la fachada real (`02-fachada-real`). | — |
| 3 | **Video del recorrido** | Sale del reel propio del local. Se usaron solo los tramos sin personas y sin texto, pero conviene que la dueña lo apruebe. También se usa una publicación del Instagram del local (pasta de maní: `ig-pasta-de-mani.jpg`). | `public/video/recorrido.mp4` |
| 4 | **Dominio** | Hoy en GitHub Pages (`martinviretti.github.io/el-almacen-de-lola-landing`). Con dominio propio: build con `SITE_URL` y `BASE_PATH=/`, y dar de alta el sitio en Google Search Console mandando `sitemap-index.xml` (en una subcarpeta los buscadores no leen `robots.txt`). | `astro.config.mjs` → `SITE` / `BASE` |

## Fotos

Desde el rediseño del 18/10/2026 **todas las fotos de la web son propias del local**: kit fotográfico, fotos del celular de la encargada y publicaciones del Instagram de Lola. Sin imágenes generadas con IA ni fotos de terceros. Las originales y las viejas quedan en `../fotos-lola/`.

## Datos a confirmar

- **Preguntas frecuentes** marcadas `pendiente: true`: consulta por Instagram, orgánicos. → `src/data/site.ts` → `preguntas`
- **Qué vas a encontrar** (`categorias`): confirmar que cada categoría y su línea coincida con lo que venden. En especial: congelados ("hamburguesas vegetales y más") y untables ("pastas de maní y más").
- **Por qué Lola** (`razones`): son propuestas. Confirmar que se fraccionen en el local frutos secos, semillas, **legumbres y especias**. Las paradas del video (`paradas`) también son propuestas.
- **Marcas**: la franja de logos se sacó en el rediseño porque solo Entrenuts estaba confirmada. Si la encargada confirma marcas, se puede volver a sumar (los logos están en el historial de git).
- **Sellos**: Sin TACC, vegano, orgánico, sin lactosa, sin azúcar agregada e integral, con íconos propios (no los logos oficiales: el de Sin TACC solo puede ir en envases certificados). Sacar los que no apliquen → `sellos`.
- **Calificación de Google**: la portada y "Lo que dicen" muestran `googleCalificacion` (4,3). Actualizarla cada tanto.
- **Número de WhatsApp**: los botones (portada, barra del celular y Visitanos) están, pero sin número: abren WhatsApp con el mensaje listo y la persona elige el chat. Cargarlo en `src/data/negocio.ts` → `whatsapp`, con código de país y sin espacios (ej. `5491112345678`).

## Ficha de Google

- **Sin reclamar** al 12/10/2026: reclamarla desde una cuenta del local, cargar el sitio web y corregir el nombre ("El Almacen de LOLA" → "La Almacén de Lola", como el cartel). Guía completa en `../FICHA-GOOGLE.md` (fuera del repo).
- **Teléfono de la ficha** (011 15-5764-7235): confirmar que es del local y si tiene WhatsApp. Si sí, cargarlo en `negocio.ts` → `whatsapp` como `5491157647235`.
- **Calificación** (`googleCalificacion`, 4,3 al 12/10/2026): actualizarla cada tanto. No se pone en los datos estructurados (Google no acepta calificaciones propias del negocio).

## Opiniones de Google

- La tarjeta de Google en "Visitanos" pasa en carrusel las opiniones de `resenas` (`site.ts`): 6 opiniones reales copiadas de la ficha el 12/10/2026, con nombre e inicial. Para sumar o cambiar: copiarlas tal cual de Google, sin retocarlas. La calificación general está en `googleCalificacion` (`negocio.ts`).

## Mejoras opcionales

- **Video en mejor calidad**: el reel viene a 480 × 856. Si la encargada tiene el video original del celular, se puede rehacer el recorrido en HD con los mismos tramos.
- **Logo en vector** (AI, PDF, SVG) o PNG grande, para reemplazar el de 150 px.

## Confirmado

- **Medios de pago** (12/10/2026): efectivo con descuento, tarjeta y Mercado Pago. El porcentaje del descuento no se publica.

- Nombre comercial: **La Almacén de Lola**, como dice el cartel (12/10/2026; reemplaza a "El Almacén de Lola"). Los usos que hablan del local van en femenino ("la almacén"); "un almacén de barrio" y "almacén natural" como rubro quedan en masculino.
- El bolsón de verduras ya no se hace: se sacó de categorías, preguntas e historias destacadas (11/10/2026).
- Domingos cerrado (11/10/2026).
- Sin TACC: se aseguran solo los envasados con logo oficial; lo fraccionado en el local no se recomienda a celíacos por contacto cruzado (11/10/2026).
