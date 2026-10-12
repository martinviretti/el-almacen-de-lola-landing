# Pendientes antes de publicar

Todo lo de esta lista es propuesta o dato sin confirmar. Validarlo con la encargada o la dueña del local.

## Bloqueantes

| # | Tema | Situación | Dónde se cambia |
|---|---|---|---|
| 1 | **Fotos de Google Maps** | Las fotos `04-pasillo`, `05-granel`, `06-mostrador` y `12-exhibidores` de `src/assets/fotos/` son versiones retocadas de fotos que subieron a Google Maps dos clientas: **Miriam Marto** y **Julia Marquez**. Los derechos son de ellas: subirlas a Maps no autoriza a usarlas en otra web. Pedirles permiso por Maps o Instagram, o reemplazarlas por fotos propias de las mismas tomas. La galería no muestra créditos (decisión de diseño); si se pide permiso, conviene ofrecerles mencionarlas. | `src/data/site.ts` → `galeria` y `recorridoMovil`. Las demás fotos del kit son propias (12/10/2026) |
| 2 | **Fachada de la portada** | `01-fachada-hero.webp` es una versión retocada con IA (la elegida por el kit por impacto). "Visitanos" usa la foto real `02-fachada-real`. | `src/assets/fotos/` |
| 3 | **Video del recorrido** | Sale del reel propio del local. Se usaron solo los tramos sin personas y sin texto, pero conviene que la dueña lo apruebe. La galería también usa 7 cuadros de ese video (`src/assets/galeria/video-*.jpg`) y 8 fotos de publicaciones del Instagram del local. | `public/video/recorrido.mp4` |
| 4 | **Dominio** | Hoy en GitHub Pages (`martinviretti.github.io/el-almacen-de-lola-landing`). Con dominio propio: build con `SITE_URL` y `BASE_PATH=/`, y dar de alta el sitio en Google Search Console mandando `sitemap-index.xml` (en una subcarpeta los buscadores no leen `robots.txt`). | `astro.config.mjs` → `SITE` / `BASE` |

## Imágenes ilustrativas

Las 8 fotos de "Algo rico para cada momento" y las 2 de la franja "De la almacén a tu mesa" son **generadas**: no muestran el local ni el surtido real. La web ya no lo aclara al pie (se sacó el aviso el 12/10/2026, a pedido de Martín): reemplazarlas por fotos propias cuando estén. No usarlas en el recorrido ni en la galería del local.

## Datos a confirmar

- **Preguntas frecuentes** marcadas `pendiente: true`: consulta por Instagram, orgánicos. → `src/data/site.ts` → `preguntas`
- **Productos por momento del día** (`momentos`): el copy es una propuesta; confirmar que cada momento coincida con lo que venden. Marcado `pendiente`: orgánicos certificados.
- **Textos del recorrido**: son propuestas. En particular "mezclas fraccionadas" (granel) y "Yogures, leches vegetales y congelados" (heladeras).
- **Marcas**: la franja muestra los logos oficiales (bajados de cada sitio) de Natier, Kapac, Entrenuts, Smams, Cachafaz, Kraus y Roapipó. Entrenuts aparece en las fotos del local; las demás hay que confirmarlas con la encargada → `src/data/site.ts` → `marcas`. Sin logo ubicable: Felices las Vacas, Cereal Mix, Ades, Hierbas del Oasis y Trefo (estas dos también aparecen en las fotos). Para sumarlas: guardar el logo (PNG transparente) en `src/assets/marcas/` e importarlo.
- **Sellos**: Sin TACC, vegano, orgánico, sin lactosa, sin azúcar agregada e integral, con íconos propios (no los logos oficiales: el de Sin TACC solo puede ir en envases certificados). Sacar los que no apliquen → `sellos`.
- **Seguidores de Instagram**: el hero de escritorio dice "Más de 1.700" (eran 1.747 al 10/10/2026). Subirlo cuando pase un número redondo.
- **Número de WhatsApp**: el botón flotante ya está, pero sin número (abre WhatsApp con el mensaje listo y la persona elige el chat). Cargarlo en `src/data/negocio.ts` → `whatsapp`, con código de país y sin espacios (ej. `5491112345678`).

## Ficha de Google

- **Sin reclamar** al 12/10/2026: reclamarla desde una cuenta del local, cargar el sitio web y corregir el nombre ("El Almacen de LOLA" → "La Almacén de Lola", como el cartel). Guía completa en `../FICHA-GOOGLE.md` (fuera del repo).
- **Teléfono de la ficha** (011 15-5764-7235): confirmar que es del local y si tiene WhatsApp. Si sí, cargarlo en `negocio.ts` → `whatsapp` como `5491157647235`.
- **Calificación** (`googleCalificacion`, 4,3 al 12/10/2026): actualizarla cada tanto. No se pone en los datos estructurados (Google no acepta calificaciones propias del negocio).

## Mejoras opcionales

- **Video en mejor calidad**: el reel viene a 480 × 856. Si la encargada tiene el video original del celular, se puede rehacer el recorrido en HD con los mismos tramos.
- **Logo en vector** (AI, PDF, SVG) o PNG grande, para reemplazar el de 150 px.

## Confirmado

- **Medios de pago** (12/10/2026): efectivo con descuento, tarjeta y Mercado Pago. El porcentaje del descuento no se publica.

- Nombre comercial: **La Almacén de Lola**, como dice el cartel (12/10/2026; reemplaza a "El Almacén de Lola"). Los usos que hablan del local van en femenino ("la almacén"); "un almacén de barrio" y "almacén natural" como rubro quedan en masculino.
- El bolsón de verduras ya no se hace: se sacó de categorías, preguntas e historias destacadas (11/10/2026).
- Domingos cerrado (11/10/2026).
- Sin TACC: se aseguran solo los envasados con logo oficial; lo fraccionado en el local no se recomienda a celíacos por contacto cruzado (11/10/2026).
