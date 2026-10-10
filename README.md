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
| Fotos | `src/assets/fotos/` (Astro las convierte a WebP en el build) |
| Colores y tipografía | `src/styles/global.css` → bloque `@theme` |
| Animación del recorrido | `src/scripts/world.ts` |
| Imagen para compartir en redes | `public/og.jpg` (1200 × 630) |

Para sumar una parada al recorrido: agregar la foto en `src/assets/fotos/`, importarla en `site.ts` y sumar un objeto a `recorrido`. La altura del scroll se ajusta sola.

Para sumar un ícono: elegirlo en [phosphoricons.com](https://phosphoricons.com) (variante light) y agregar su nombre a la lista de `src/components/Icon.astro`.

## Cómo funciona el recorrido

`ScrollWorld.astro` apila todas las paradas en la misma celda de una grilla, dentro de un escenario `position: sticky`. `world.ts` arma una línea de tiempo GSAP atada al scroll: cada parada ocupa una unidad (pausa para leer y después transición). La primera transición simula entrar por la puerta del local con un revelado circular; las siguientes son cortinas desde abajo con zoom.

Sin JavaScript o con "reducir movimiento" activado en el dispositivo, las paradas se muestran como una lista normal, sin animaciones.

## Publicar en Cloudflare Pages

Opción A, desde la terminal (sin GitHub):

```powershell
npm run build
npx wrangler pages deploy dist --project-name el-almacen-de-lola
```

La primera vez pide iniciar sesión en Cloudflare en el navegador.

Opción B, con GitHub: subir el repo, y en Cloudflare → Workers & Pages → Create → Pages → conectar el repo. Build command `npm run build`, output directory `dist`.

Después de publicar, actualizar `SITE` en `astro.config.mjs` y la URL de `public/robots.txt` con el dominio real.

## Origen de los materiales

Logo, fotos y datos salen del perfil público [@lolasaludable](https://www.instagram.com/lolasaludable/), relevado el 10/10/2026 (kit en `Lola-branding-web`). Los derechos son del local. La foto de Bendito Caldo del kit no se usa.
