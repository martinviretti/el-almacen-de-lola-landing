# Pendientes antes de publicar

Todo lo de esta lista es propuesta o dato sin confirmar. Validarlo con la encargada o la dueña del local.

## Bloqueantes

| # | Tema | Situación | Dónde se cambia |
|---|---|---|---|
| 1 | **Autorización para publicar fotos** | Las fotos salen del Instagram del local. La dueña tiene que aprobar su uso en la web. | `src/assets/fotos/` |
| 2 | **Consentimiento de la persona en la foto** | `equipo-pedidos.jpg` muestra a una integrante del equipo. Pedirle permiso o reemplazar la foto. | `src/data/site.ts` → `recorrido[1]` |
| 3 | **Nombre comercial** | La fachada dice "La almacén de Lola", Instagram dice "La Almacen de Lola" y el link de la bio dice `el-almacen-de-lola`. La web usa **"El Almacén de Lola"**. | `src/data/negocio.ts` → `nombre` (y textos sueltos en `Nav.astro`, `og.jpg`) |
| 4 | **Dominio** | Puse `el-almacen-de-lola.pages.dev` como provisorio. | `astro.config.mjs` → `SITE` y `public/robots.txt` |

## Datos a confirmar

- **Domingo cerrado**: el perfil solo lista lunes a sábado. → `src/data/negocio.ts` → `horarios`
- **Preguntas frecuentes** marcadas `pendiente: true`: consulta por Instagram, sin TACC, bolsón de verduras, orgánicos. → `src/data/site.ts` → `preguntas`
- **Categorías** marcadas `pendiente: true`: productos orgánicos y bolsón de verduras (¿se sigue haciendo?). → `categorias`
- **Detalles de categorías** que inferí: "Almendra, coco, avena y más" (leches), "Opciones vegetales y tradicionales" (yogures), "Listos para resolver la semana" (congelados).
- **Textos del recorrido**: son propuestas mías. En particular "Desde las 8 de la mañana ya estamos preparando los pedidos" y "llegan frescos al almacén" (panificados).
- **Seguidores de Instagram**: 1.747 al 10/10/2026. Es un número fijo; actualizarlo cada tanto o sacarlo.
- **WhatsApp / teléfono**: no hay. Si quieren sumarlo, se agrega como botón en el hero y en Visitanos.

## Para que se vea mucho mejor

Las fotos de Instagram llegan a 480 a 640 px. Se ven bien en celular, pero en una pantalla grande quedan algo blandas (les puse un grano sutil para disimularlo). El salto de calidad más grande es **sacar fotos nuevas con el celular**:

- Fachada de día, de frente, vertical y horizontal (sin autos adelante si se puede).
- Interior completo desde la puerta.
- Góndolas por categoría: yerbas, frutos secos, leches vegetales, heladera de yogures, freezer, panificados, barritas.
- Primeros planos de producto sobre la madera del local.
- Mostrador y balanza (sin personas, o con su permiso).
- Luz natural, cámara principal del celular (no la gran angular), sin zoom digital, sin filtros.

Mandar los archivos originales (por Drive o WhatsApp como "documento", no como foto, para que no se compriman).

Y si existe el **logo en vector** (AI, PDF, SVG) o en PNG grande, reemplaza al de 150 px.
