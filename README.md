# Landing — El Almacén de Lola

Sitio de presentación del almacén natural de Av. Presidente Perón 3099, Victoria.
Astro 7 + Tailwind CSS 4 + GSAP ScrollTrigger + Lenis. Salida 100 % estática, lista para Cloudflare Pages.

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
| Paradas del recorrido, categorías, galería, frase, preguntas | `src/data/site.ts` |
| Fotos del local | `src/assets/local/` (Astro las convierte a WebP en el build) |
| Fotogramas del recorrido | `src/assets/recorrido/` |
| Imágenes ilustrativas | `src/assets/categorias/` y `src/assets/carrusel/` |
| Video del recorrido | `public/video/recorrido.mp4` |
| Colores y tipografía | `src/styles/global.css` → bloque `@theme` |
| Animación del recorrido | `src/scripts/world.ts` |
| Imagen para compartir en redes | `public/og.jpg` (1200 × 630) |
| Música ambiental | `src/scripts/musica.ts` (se genera en el navegador; para usar un MP3, ponerlo en `public/audio/` y completar `PISTA`) |

Para cambiar un tramo del recorrido: editar `video: [inicio, fin]` de la parada en `site.ts` (segundos del video editado) y regenerar su fotograma en `src/assets/recorrido/`.

Para sumar un ícono: elegirlo en [phosphoricons.com](https://phosphoricons.com) (variante light) y agregar su nombre a la lista de `src/components/Icon.astro`.

## Cómo funciona el recorrido

`ScrollWorld.astro` apila todas las paradas en la misma celda de una grilla, dentro de un escenario `position: sticky`. `world.ts` arma una línea de tiempo GSAP atada al scroll:

1. **Fachada**: foto a pantalla completa con la tarjeta del hero. Al bajar, zoom hacia la puerta y se abre en círculo el arco del interior.
2. **Recorrido**: dentro del arco, el video avanza con el scroll (cada parada recorre su tramo) y los textos se relevan en cada borde.

El video se descarga entero como blob después de que carga la página: así ir para atrás y para adelante es instantáneo. Mientras carga, si falla, o con "ahorro de datos" activado, se ven los fotogramas de cada parada. En iOS se hace play y pausa al primer toque para que Safari pinte los cuadros.

Sin JavaScript o con "reducir movimiento" activado, todo se muestra como una lista normal con los fotogramas, sin animaciones.

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

Logo y datos salen del perfil público [@lolasaludable](https://www.instagram.com/lolasaludable/), relevado el 10/10/2026. El video es un reel del local. Las fotos interiores son de Google Maps (ver créditos y permisos en PENDIENTES.md). Las imágenes de categorías y de la franja final son ilustrativas.
