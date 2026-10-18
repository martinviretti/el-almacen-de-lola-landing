# Landing — La Almacén de Lola

Sitio de presentación de La Almacén de Lola, almacén natural de Av. Presidente Perón 3099, Victoria.
Astro 7 + Tailwind CSS 4 + Lenis (scroll suave). Salida 100 % estática, publicada en GitHub Pages (https://martinviretti.github.io/el-almacen-de-lola-landing/) con el workflow de `.github/workflows/deploy.yml`: cada push a `main` se publica solo.

Antes de publicar, revisar [PENDIENTES.md](PENDIENTES.md).

## Correr en local (PowerShell)

```powershell
cd "C:\Users\martin.viretti\proyectos-claude\el-almacen-de-lola\landing"
npm install
npm run dev
```

Abre en http://localhost:4321.

```powershell
npm run build     # genera dist/
npm run preview   # sirve dist/ para probar el build final
```

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Nombre, dirección, Instagram, horarios | `src/data/negocio.ts` |
| Categorías de "Qué vas a encontrar" (`categorias`), razones de "Por qué Lola" (`razones`), sellos, paradas del video, opiniones de Google, frase y preguntas | `src/data/site.ts` |
| WhatsApp (`hrefWhatsApp`) | `src/data/negocio.ts` |
| "Abierto ahora" (calcula con `horarios`, en hora de Argentina) | `src/scripts/estado.ts` |
| Fotos del local | `src/assets/fotos/` (kit fotográfico del 12/10/2026, fotos del celular del local y publicaciones del Instagram de Lola) |
| Logos oficiales de Instagram, WhatsApp y Mercado Pago | `src/components/IconoMarca.astro` (trazos del paquete `simple-icons`) |
| Video del recorrido y su afiche | `public/video/recorrido.mp4` y `src/assets/recorrido/parada-1.jpg` |
| Colores y tipografía (Fraunces en títulos, Manrope en texto) | `src/styles/global.css` → bloque `@theme` |
| Imagen para compartir en redes | `public/og.jpg` (1200 × 630) |

La página tiene 7 bloques, en orden: portada (`Hero`), qué vas a encontrar (`Encontrar`), por qué Lola (`PorQue`), recorrido (`Recorrido`), opiniones (`Opiniones` + `InstagramLola`), visitanos (`Visitanos`) y preguntas (`Faq`). En el celular, `BarraMovil` deja fijos abajo el horario, WhatsApp y "Cómo llegar". El porqué de cada decisión está en [REDISENO.md](REDISENO.md).

En una categoría, `forma` decide el tamaño en la grilla: `grande` (2 × 2), `alta` (1 × 2), `ancha` (2 × 1) o `chica`. Para cambiar dónde arranca una parada del video, editar su `desde` (segundos) en `paradas`.

Para sumar un ícono: elegirlo en [phosphoricons.com](https://phosphoricons.com) (variante light) y agregar su nombre a la lista de `src/components/Icon.astro`.

## Cómo funciona el recorrido

`Recorrido.astro` muestra el video del local (3:4, ~22 s, sin sonido). Arranca solo cuando se ve en pantalla y se pausa al salir. **Nunca maneja el scroll.**

- **En escritorio:** al costado, la lista de paradas marca dónde va el video. Tocar una parada salta a ese tramo.
- **En el celular:** funciona como historias. Arriba hay barritas, abajo el cartel de la parada; tocar a la derecha avanza y a la izquierda vuelve.

Hay un botón de pausa. Con "reducir movimiento" activado no arranca solo.

### Cómo se armó el video

Del reel original (480 × 856, 87 s) se tomaron los tramos 0:00 a 0:27 y 0:35 a 0:52,5 (sin personas), se recortó la franja limpia sin los textos del reel (474 × 632, 3:4), se aceleró 2× y se codificó con un keyframe cada 8 cuadros para que el scrub sea fluido:

```powershell
ffmpeg -i reel.mp4 -filter_complex "[0:v]trim=0:27,setpts=PTS-STARTPTS,crop=474:632:3:108,fps=30,format=yuv420p[a];[0:v]trim=35:52.5,setpts=PTS-STARTPTS,crop=474:632:3:108,fps=30,format=yuv420p[b];[a][b]xfade=transition=fade:duration=0.6:offset=26.4,setpts=0.5*PTS,fps=24[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 28 -g 8 -keyint_min 8 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart recorrido.mp4
```

## Publicación

El sitio está en **https://martinviretti.github.io/el-almacen-de-lola-landing/**.

Cada `git push` a `main` lo vuelve a compilar y publicar solo, con GitHub Actions (`.github/workflows/deploy.yml`). El avance se ve en la pestaña *Actions* del repo y tarda un par de minutos.

Como GitHub Pages sirve el sitio en una subcarpeta, todo lo que apunte a `public/` o a otra página tiene que pasar por `url()` de `src/lib/url.ts`. Para moverlo a un dominio propio en la raíz:

```powershell
$env:SITE_URL = "https://dominio.com.ar"; $env:BASE_PATH = "/"; npm run build
```

## Origen de los materiales

Logo y datos salen del perfil público [@lolasaludable](https://www.instagram.com/lolasaludable/), relevado el 10/10/2026. El video es un reel del local. Todas las fotos son propias del local: kit fotográfico del 12/10/2026, fotos del celular de la encargada y una publicación del Instagram de Lola. Desde el rediseño (18/10/2026) no se usan las cuatro que salían de fotos de clientas en Google Maps ni la fachada retocada con IA; quedan archivadas en `../fotos-lola/`.
