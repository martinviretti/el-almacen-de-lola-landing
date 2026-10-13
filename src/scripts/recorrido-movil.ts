import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

// Recorrido del celular (ver RecorridoMovil.astro). Una deslizada = una parada:
// la foto nueva entra con un fundido, se acerca muy lento (para que nunca se vea
// congelada) y el cartel aparece por partes. Tocar la foto también avanza.
// De la portada (la puerta) a la primera parada, la cámara cruza el vidrio y aparece
// el interior; al volver, sale por la puerta. Desde la última parada, la deslizada
// baja al resto de la página.
export function initRecorridoMovil(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-rm-stage]')!;
  const paradas = [...root.querySelectorAll<HTMLElement>('[data-rm-parada]')];
  const segmentos = [...root.querySelectorAll<HTMLButtonElement>('[data-rm-ir]')];
  const hint = root.querySelector<HTMLElement>('[data-rm-hint]');
  const anuncio = root.querySelector<HTMLElement>('[data-rm-anuncio]');
  const n = paradas.length;

  const img = (i: number) => paradas[i].querySelector<HTMLElement>('[data-rm-img]')!;
  // El cruce de la puerta se anima en el marco de la foto, así no choca con el acercamiento lento de la imagen.
  const marco = (i: number) => paradas[i].querySelector<HTMLElement>('.rm-foto')!;
  const texto = (i: number) => paradas[i].querySelector<HTMLElement>('[data-rm-texto]')!;
  const piezas = (i: number) => [...paradas[i].querySelectorAll<HTMLElement>('[data-rm-pieza]')];

  let actual = 0;
  let animando = false;
  let pendiente: number | null = null;
  let acercamiento: gsap.core.Tween | null = null;
  let empezo = false;

  gsap.set(paradas, { autoAlpha: 0, zIndex: 0 });
  gsap.set(paradas[0], { autoAlpha: 1, zIndex: 1 });
  // Solo la parada visible queda al alcance del teclado y del lector de pantalla. Se pone
  // desde acá (no en el HTML) para que sin JS o sin animaciones la lista quede completa.
  paradas.slice(1).forEach((p) => p.setAttribute('inert', ''));
  // Punto del vidrio por donde se "entra": entre las letras del logo, hacia las góndolas.
  const puerta = img(0).style.transformOrigin || '58% 52%';
  gsap.set(marco(0), { transformOrigin: puerta });

  const acercar = (i: number) => {
    acercamiento?.kill();
    const zoom = Number(paradas[i].dataset.zoom ?? 1);
    if (zoom > 1) acercamiento = gsap.fromTo(img(i), { scale: 1 }, { scale: zoom, duration: 8, ease: 'none' });
  };

  const pintarProgreso = (i: number) => segmentos.forEach((s, k) => s.classList.toggle('is-llena', k + 1 <= i));

  const ir = (destino: number) => {
    if (destino < 0 || destino >= n || destino === actual) return;
    // Mientras hay una transición, se guarda solo el último pedido.
    if (animando) {
      pendiente = destino;
      return;
    }
    animando = true;
    const desde = actual;
    const adelante = destino > desde;
    actual = destino;

    if (!empezo && hint) {
      empezo = true;
      gsap.to(hint, { autoAlpha: 0, duration: 0.3 });
    }

    const sale = paradas[desde];
    const entra = paradas[destino];
    sale.setAttribute('inert', '');
    entra.removeAttribute('inert');
    gsap.set(entra, { zIndex: 2 });
    gsap.set(sale, { zIndex: 1 });
    // El cartel aparece junto con su texto (nunca vacío mientras cruza la foto).
    gsap.set(texto(destino), { autoAlpha: 0, y: 0 });

    const cruzaPuerta = Math.min(desde, destino) === 0 && Math.max(desde, destino) === 1;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(sale, { autoAlpha: 0, zIndex: 0 });
        gsap.set(img(desde), { scale: 1 });
        gsap.set(marco(desde), { scale: 1 });
        animando = false;
        if (pendiente !== null) {
          const siguiente = pendiente;
          pendiente = null;
          ir(siguiente);
        }
      },
    });
    tl.to(texto(desde), { autoAlpha: 0, y: adelante ? -12 : 12, duration: 0.22, ease: 'power2.in' }, 0);
    let piezasEn = 0.25;
    if (cruzaPuerta && adelante) {
      // Entrar: la puerta se agranda hasta "atravesarla" y el interior aparece acercándose.
      tl.to(marco(0), { scale: 2.6, duration: 1.1, ease: 'power1.in' }, 0);
      tl.fromTo(entra, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55, ease: 'power1.inOut' }, 0.45);
      tl.fromTo(marco(1), { scale: 1.3 }, { scale: 1, duration: 1, ease: 'power3.out' }, 0.45);
      piezasEn = 0.85;
    } else if (cruzaPuerta) {
      // Salir: el interior se aleja y la puerta vuelve a su lugar.
      tl.to(marco(1), { scale: 1.25, duration: 0.6, ease: 'power2.in' }, 0);
      tl.fromTo(entra, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.inOut' }, 0.1);
      tl.fromTo(marco(0), { scale: 2.6 }, { scale: 1, duration: 1, ease: 'power3.out' }, 0.1);
      piezasEn = 0.6;
    } else {
      tl.to(img(desde), { scale: `+=0.03`, duration: 0.7, ease: 'power2.inOut' }, 0);
      tl.fromTo(entra, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, ease: 'power2.inOut' }, 0);
    }
    tl.fromTo(
      piezas(destino),
      { autoAlpha: 0, y: adelante ? 24 : -16 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06 },
      piezasEn,
    );
    tl.to(texto(destino), { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, piezasEn - 0.1);

    acercar(destino);
    pintarProgreso(destino);
    if (anuncio) anuncio.textContent = entra.querySelector('h1, h2')?.textContent?.trim() ?? '';
  };

  // La portada también se acerca muy lento hacia la puerta, para que no quede quieta.
  acercar(0);

  // Posición del escenario en la página: si está corrido (se volvió desde abajo),
  // la primera deslizada lo vuelve a encuadrar en lugar de cambiar de parada.
  const arriba = () => root.getBoundingClientRect().top + window.scrollY;
  const encuadrado = () => Math.abs(window.scrollY - arriba()) < 4;
  const scrollA = (y: number, duration: number) => window.lenis?.scrollTo(y, { duration, force: true, lock: true });
  const salir = () => scrollA(arriba() + root.offsetHeight, 0.8);

  const avanzar = () => {
    if (!encuadrado()) return void (window.scrollY > arriba() ? salir() : scrollA(arriba(), 0.6));
    if (actual === n - 1) salir();
    else ir(actual + 1);
  };
  const retroceder = () => {
    if (!encuadrado()) return void scrollA(arriba(), 0.6);
    ir(actual - 1);
  };

  // Una acción por deslizada: un mismo gesto dispara varios eventos seguidos.
  let gestoUsado = false;
  Observer.create({
    target: stage,
    type: 'touch',
    tolerance: 24,
    onPress: () => (gestoUsado = false),
    onUp: () => {
      if (gestoUsado) return;
      gestoUsado = true;
      avanzar();
    },
    onDown: () => {
      if (gestoUsado) return;
      gestoUsado = true;
      retroceder();
    },
  });

  // Tocar la foto avanza; como en las historias de Instagram, el tercio izquierdo vuelve
  // atrás (no cuentan los botones ni el cartel). Si el escenario quedó a medias en
  // pantalla, el toque primero lo encuadra.
  stage.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('button, a, [data-rm-texto]')) return;
    if (!encuadrado()) return void scrollA(arriba(), 0.6);
    if (e.clientX < stage.clientWidth / 3 && actual > 0) retroceder();
    else avanzar();
  });
  // "Saltar recorrido" y "Seguí mirando": bajan directo al resto de la página.
  root.querySelectorAll('[data-rm-saltar], [data-rm-salir]').forEach((b) => b.addEventListener('click', () => salir()));
  segmentos.forEach((s) => s.addEventListener('click', () => ir(Number(s.dataset.rmIr))));
  root.querySelector('[data-rm-anterior]')?.addEventListener('click', retroceder);
  root.querySelector('[data-rm-siguiente]')?.addEventListener('click', avanzar);

  // Al soltar el escenario, la foto sube un poco más lento que la página.
  gsap.to(root.querySelectorAll('.rm-foto'), {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
  });

  // "En el recorrido": los botones flotantes se corren arriba para no tapar el cartel.
  ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: 'bottom center',
    onLeave: () => document.documentElement.classList.remove('en-recorrido'),
    onEnterBack: () => document.documentElement.classList.add('en-recorrido'),
  });
  document.documentElement.classList.toggle('en-recorrido', root.getBoundingClientRect().bottom > window.innerHeight / 2);

  // Las fotos de las paradas se precargan cuando el navegador está libre.
  const precargar = () =>
    paradas.forEach((p) => {
      const i = p.querySelector('img');
      if (i) i.loading = 'eager';
    });
  if ('requestIdleCallback' in window) window.requestIdleCallback(precargar, { timeout: 2000 });
  else window.setTimeout(precargar, 1200);
}
