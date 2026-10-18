# Rediseño de la landing: diagnóstico y propuesta

Rama `rediseno`. Main sigue intacto y publicado hasta que esto se apruebe.

**Objetivo:** que quien la abra tenga ganas de ir al local y sepa cómo llegar con un toque. Lo más común va a ser alguien que llega desde el celular, por Instagram o Google. Es una **landing, no una tienda**: no lleva precios, carrito ni catálogo.

---

## Lo que está bien y se queda

- La marca: la paleta crema con verde profundo, el logo y el tono cálido de los textos.
- Las fotos reales del kit (16 retocadas, con recorte para celular), el video del recorrido y las 6 opiniones reales de Google.
- Los datos del local: dirección, horarios, medios de pago, preguntas frecuentes y el criterio de sin TACC.
- La base técnica: Astro, Tailwind, GSAP y Lighthouse con 100 en accesibilidad, buenas prácticas y SEO.

## Lo que hoy juega en contra

1. **Tarda en decir algo útil.**
   - En escritorio, el recorrido ocupa unos 3.600 px de scroll (cuatro pantallas) antes del primer contenido.
   - En el celular, la portada arranca unos segundos en blanco mientras cargan las fotos.
2. **Lo que hace venir a la gente está abajo.** El 4,3 de Google, las opiniones, si está abierto, "Cómo llegar" y WhatsApp aparecen recién en la mitad o al final.
3. **Las fotos se repiten.** "Algo rico para cada momento" muestra cuatro estantes casi iguales. Falta producto de cerca: frutos secos, especias, granel, el mostrador.
4. **Hay patrones genéricos de plantilla:** seis tarjetas iguales de sellos, cuatro tarjetas iguales de productos, preguntas en acordeón y dos botones flotantes.
5. **Hay detalles rotos o molestos:**
   - Al navegar con el menú, el título de la sección queda tapado por la barra.
   - En el celular, la música arranca sola con la primera deslizada.
   - En mi prueba, el mapa de "Visitanos" se vio vacío. Hay que confirmar si es el entorno de prueba o un problema real.
6. **Hay riesgo legal en las fotos.**
   - `04-pasillo`, `05-granel`, `06-mostrador` y `12-exhibidores` son retoques de fotos que subieron clientas a Google Maps.
   - La fachada de la portada está retocada con IA.
   - El rediseño no debería depender de ninguna de esas.

## Propuesta: un recorrido corto que termina en "vení"

Seis bloques, en este orden. En escritorio y en el celular se cuenta lo mismo; cambia cómo se ve.

| # | Bloque | Qué resuelve | Con qué fotos |
|---|---|---|---|
| 1 | **Portada** | En 3 segundos: qué es, dónde queda, si está abierto ahora y dos botones (**Cómo llegar** y **WhatsApp**). Abajo, "4,3 en Google · Victoria · Abierto hasta las 20 h" (se calcula con el horario real). | `02-fachada-real` o `07-vista-general` (propias) |
| 2 | **Qué vas a encontrar** | Las categorías en una grilla despareja tipo revista: una foto grande y varias chicas, con una línea de "para qué viene la gente". Reemplaza a "Algo rico para cada momento" y a los sellos. | `09-frutos-secos`, `10-infusiones`, `11-especias`, `14-granel-estantes`, `15-aceites`, `16-snacks`, `13-heladeras` y fotos de Instagram |
| 3 | **Por qué Lola** | Tres diferencias contadas con foto, alternando lados: te asesoramos, comprás suelto lo que necesitás, y sin TACC, vegano y sin azúcar bien señalizados. | Fotos propias de granel, vidriera y pizarrón (de las 36 del celular). Si falta una del mostrador, se saca una nueva |
| 4 | **El recorrido** | Se queda el "wow", pero más corto: una pantalla y media en escritorio. En el celular pasa a historias tipo Instagram (tocar para avanzar), sin bloquear el scroll. | El video y los 6 cuadros que ya existen |
| 5 | **Lo que dicen** | Una opinión grande por vez, con la calificación y el link para dejar la propia, más la franja de Instagram. | — |
| 6 | **Visitanos** | Mapa, horario con "abierto ahora", cómo llegar y las preguntas frecuentes en dos columnas en lugar de acordeón. | `02-fachada-real` |

**Solo en el celular:** una barra fija abajo con **Cómo llegar · WhatsApp · Abierto hasta las 20 h**. Reemplaza a los dos botones flotantes.

### Cambios visuales

- **Tipografía:** títulos con una serif cálida (candidata: Fraunces) y el texto sigue en Manrope. Le da cara de almacén de barrio cuidado y la saca de "plantilla de startup".
- **Color:** se mantiene. Se usa el verde profundo para los botones y el crema de fondo, con una textura muy suave de papel.
- **Movimiento:** entradas escalonadas y suaves. Sin scroll secuestrado y sin música que arranque sola.
- **Fotos:** recortes variados (vertical, cuadrado, apaisado) para que la página no sea una fila de tarjetas iguales.

## Decisiones pendientes de Martín

1. **El recorrido largo:** ¿acortarlo (recomendado), dejarlo como está o sacarlo?
2. **La música:** ¿sacarla (recomendado), dejarla apagada con el botón o dejarla como está?
3. **Las fotos de las clientas y la fachada con IA:** ¿las saco del diseño nuevo (recomendado) o pedís permiso?
4. **Tipografía:** ¿probamos la serif en los títulos?

## Cómo sigue

1. Con esas respuestas, implemento en esta rama de a un bloque, empezando por la portada y la barra del celular.
2. En cada paso, capturas en escritorio y celular.
3. Al final, Lighthouse otra vez (la meta es seguir en 100) y recién ahí unir a main con tu OK.

---

## Estado (18/10/2026): implementado en esta rama

Martín aprobó las cuatro recomendaciones: recorrido corto, sin música, sin fotos de clientas ni fachada con IA, y serif en los títulos.

- **Bloques:** `Hero`, `Encontrar`, `PorQue`, `Recorrido`, `Opiniones` (+ `InstagramLola`), `Visitanos`, `Faq` y `BarraMovil`.
- **Lo que se sacó:** el scroll largo del recorrido (`ScrollWorld` y `RecorridoMovil`), la música, la galería, "Algo rico para cada momento", la franja de marcas, los sellos sueltos, los botones flotantes y GSAP.
- **Lo nuevo:**
  - "Abierto ahora" con el horario real, en hora de Argentina.
  - Grilla tipo revista, tres razones con foto y una opinión real.
  - El video, que corre solo cuando se ve en pantalla.
  - Una opinión grande por vez, preguntas a la vista y la barra fija del celular.
- **Lighthouse en local:**
  - Celular: 93 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO.
  - Escritorio: 100 en todo.

Corrección al diagnóstico: la portada vieja ya usaba la fachada real. La versión con IA solo estaba en el kit.
