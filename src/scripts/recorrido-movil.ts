import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

// Recorrido del celular (ver RecorridoMovil.astro). Una deslizada = una parada:
// la foto nueva entra con un fundido, se acerca muy lento (para que nunca se vea
// congelada) y el cartel aparece por partes. Tocar la foto también avanza.
// Desde la última parada, la deslizada baja al resto de la página.
export function initRecorridoMovil(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-rm-stage]')!;
  const paradas = [...root.querySelectorAll<HTMLElement>('[data-rm-parada]')];
  const segmentos = [...root.querySelectorAll<HTMLButtonElement>('[data-rm-ir]')];
  const hint = root.querySelector<HTMLElement>('[data-rm-hint]');
  const anuncio = root.querySelector<HTMLElement>('[data-rm-anuncio]');
  const n = paradas.length;

  const img = (i: number) => paradas[i].querySelector<HTMLElement>('[data-rm-img]')!;
  const texto = (i: number) => paradas[i].querySelector<HTMLElement>('[data-rm-texto]')!;
  const piezas = (i: number) => [...paradas[i].querySelectorAll<HTMLElement>('[data-rm-pieza]')];

  let actual = 0;
  let animando = false;
  let pendiente: number | null = null;
  let acercamiento: gsap.core.Tween | null = null;
  let empezo = false;

  gsap.set(paradas, { autoAlpha: 0, zIndex: 0 });
  gsap.set(paradas[0], { autoAlpha: 1, zIndex: 1 });

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
    gsap.set(texto(destino), { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(sale, { autoAlpha: 0, zIndex: 0 });
        gsap.set(img(desde), { scale: 1 });
        animando = false;
        if (pendiente !== null) {
          const siguiente = pendiente;
          pendiente = null;
          ir(siguiente);
        }
      },
    });
    tl.to(texto(desde), { autoAlpha: 0, y: adelante ? -12 : 12, duration: 0.22, ease: 'power2.in' }, 0);
    tl.to(img(desde), { scale: `+=0.03`, duration: 0.7, ease: 'power2.inOut' }, 0);
    tl.fromTo(entra, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7, ease: 'power2.inOut' }, 0);
    tl.fromTo(
      piezas(destino),
      { autoAlpha: 0, y: adelante ? 24 : -16 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06 },
      0.25,
    );

    acercar(destino);
    pintarProgreso(destino);
    if (anuncio) anuncio.textContent = entra.querySelector('h1, h2')?.textContent?.trim() ?? '';
  };

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

  // Tocar la foto avanza (no los botones ni el cartel). Si el escenario quedó a medias
  // en pantalla, el toque primero lo encuadra.
  stage.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('button, a, [data-rm-texto]')) return;
    if (!encuadrado()) scrollA(arriba(), 0.6);
    else avanzar();
  });
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
