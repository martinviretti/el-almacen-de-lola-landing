import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

// Línea de tiempo del recorrido (1 unidad por parada):
//   0 → 1   la fachada: pausa, y la cámara entra por la puerta al arco.
//   i → i+1 parada i: el video recorre su tramo; el texto cambia en el borde.
//
// Escritorio: el scroll del track mueve la línea de tiempo y el video sigue al scroll.
// Celular: el video se REPRODUCE (fluido, decodificado por hardware) y la línea de
// tiempo lo sigue a él. Una deslizada arranca el recorrido entero (initMovil).
export function initWorld(world: HTMLElement) {
  const movil = window.matchMedia('(max-width: 1023px)').matches;
  const track = world.querySelector<HTMLElement>('.world-track')!;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-stop]')];
  const copies = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-copy]')!);
  const reveals = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-reveal]')!);
  const medias = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-media]')!);
  const imgs = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-img]')!);
  const rail = [...world.querySelectorAll<HTMLElement>('[data-rail]')];
  const bg = world.querySelector<HTMLElement>('[data-world-bg]');
  const hint = world.querySelector<HTMLElement>('[data-scroll-hint]');
  const videoLayer = world.querySelector<HTMLElement>('[data-video-layer]');
  const videoReveal = world.querySelector<HTMLElement>('[data-video-reveal]');
  const video = world.querySelector<HTMLVideoElement>('[data-world-video]');

  const n = stops.length;
  let active = -1;

  const setActive = (i: number) => {
    if (i === active) return;
    active = i;
    copies.forEach((c, k) => c.classList.toggle('is-active', k === i));
    videoLayer?.classList.toggle('is-entered', i >= 1);
    world.classList.toggle('is-inside', i >= 1);
    rail.forEach((r, k) => {
      r.classList.toggle('is-active', k === i);
      r.classList.toggle('is-done', k < i);
    });
  };
  const paradaEn = (t: number) => (t < 0.85 ? 0 : Math.min(n - 1, Math.floor(t + 0.1)));
  setActive(0);

  const scrub = video && !movil ? createScrubber(video, videoLayer) : null;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    paused: movil,
    onUpdate: movil ? () => setActive(paradaEn(tl.time())) : undefined,
    scrollTrigger: movil
      ? undefined
      : {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => setActive(paradaEn(self.progress * tl.duration())),
        },
  });

  // "En el recorrido" (incluye la fachada): mientras el escenario ocupa la pantalla.
  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: movil ? 'bottom center' : 'bottom bottom',
    onLeave: () => document.documentElement.classList.remove('en-recorrido'),
    onEnterBack: () => document.documentElement.classList.add('en-recorrido'),
  });
  // Al cargar, ScrollTrigger todavía no midió: se decide con la posición real del track.
  const r = track.getBoundingClientRect();
  document.documentElement.classList.toggle('en-recorrido', movil ? r.bottom > window.innerHeight / 2 : r.bottom > window.innerHeight);

  if (hint) tl.to(hint, { autoAlpha: 0, y: -16, duration: 0.2 }, 0);
  if (bg) tl.to(bg, { yPercent: -12, duration: n }, 0);

  // ---- Entrada: zoom a la puerta de la fachada y apertura circular del arco ----
  tl.to(copies[0], { opacity: 0, y: -40, filter: 'blur(10px)', duration: 0.2, ease: 'power2.in' }, 0.35);
  tl.to(imgs[0], { scale: 2.6, duration: 0.6, ease: 'power2.in' }, 0.35);
  // La fachada arranca suave (velo + desenfoque) y se enfoca al cruzar la puerta.
  tl.to(imgs[0], { filter: 'blur(0px) saturate(1)', duration: 0.25 }, 0.1);
  const velo = world.querySelector<HTMLElement>('[data-hero-velo]');
  if (velo) tl.to(velo, { opacity: 0, duration: 0.25 }, 0.1);
  tl.to(medias[0], { opacity: 0, duration: 0.2 }, 0.75);

  const arcos = [reveals[1], videoReveal].filter((el): el is HTMLElement => !!el);
  tl.fromTo(
    arcos,
    { clipPath: 'circle(0% at 50% 50%)' },
    { clipPath: 'circle(150% at 50% 50%)', duration: 0.45, ease: 'power2.inOut' },
    0.6,
  );
  tl.fromTo(imgs[1], { scale: 1.4 }, { scale: 1, duration: 0.5, ease: 'power2.out' }, 0.6);
  tl.fromTo(
    copies[1],
    { opacity: 0, y: 40, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.2, ease: 'power2.out' },
    0.8,
  );

  // ---- Paradas del recorrido: el video avanza y los textos se relevan ----
  for (let i = 1; i < n; i++) {
    const inicio = i - 0.1;
    const tramo = stops[i].dataset.tramo?.split(',').map(Number);

    if (tramo?.length === 2 && scrub) {
      const proxy = { t: tramo[0] };
      tl.fromTo(
        proxy,
        { t: tramo[0] },
        { t: tramo[1], duration: 1, immediateRender: false, onUpdate: () => scrub.seek(proxy.t) },
        inicio,
      );
    }

    if (i === 1) continue; // la primera parada ya entró con la puerta

    tl.to(copies[i - 1], { opacity: 0, y: -32, filter: 'blur(8px)', duration: 0.12, ease: 'power2.in' }, inicio - 0.12);
    tl.fromTo(
      copies[i],
      { opacity: 0, y: 32, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power2.out' },
      inicio,
    );
    // Fotograma de respaldo, por si el video no cargó.
    tl.fromTo(medias[i], { opacity: 0 }, { opacity: 1, duration: 0.2 }, inicio - 0.1);
  }

  // Pausa final para leer la última parada antes de soltar el escenario.
  tl.to({}, { duration: 0.3 });

  // Las fotos cargan perezosas: recalcular cuando terminen.
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

  if (movil) initMovil(world.querySelector<HTMLElement>('.world-stage')!, track, tl, stops, video, videoLayer);
}

// ---------------------------------------------------------------------------
// Celular: experiencia tipo historia. El escenario ocupa una sola pantalla y no
// scrollea (touch-action: none).
//  - En la portada, una deslizada arranca el recorrido: la cámara entra por la puerta
//    y el video se reproduce entero; textos y barra lo siguen. Al terminar, la página
//    baja sola hasta la frase principal.
//  - Durante el recorrido: deslizar hacia arriba lo saltea hasta el final; hacia abajo
//    vuelve a la portada.
//  - Con el recorrido terminado: deslizar hacia abajo sobre el escenario vuelve a la
//    portada para verlo de nuevo.
function initMovil(
  stage: HTMLElement,
  track: HTMLElement,
  tl: gsap.core.Timeline,
  stops: HTMLElement[],
  video: HTMLVideoElement | null,
  layer: HTMLElement | null,
) {
  const n = stops.length;
  // El video de celular va a otra velocidad que el de escritorio: los tramos se escalan.
  const escala = Number(video?.dataset.escalaMovil ?? 1);
  const tramos = stops.map((s) => s.dataset.tramo?.split(',').map((x) => Number(x) * escala) ?? [0, 0]);

  // Tiempo del video → tiempo de la línea: el tramo de la parada i ocupa [i - 0.1, i + 0.9].
  const aLinea = (vt: number) => {
    for (let i = 1; i < n; i++) {
      const [a, b] = tramos[i];
      if (vt <= b || i === n - 1) return i - 0.1 + Math.min(1, Math.max(0, (vt - a) / (b - a)));
    }
    return tl.duration();
  };

  let listo = false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (video && !conn?.saveData && video.dataset.srcMovil) {
    video.preload = 'auto';
    video.src = video.dataset.srcMovil;
    video.addEventListener(
      'loadeddata',
      () => {
        listo = true;
        layer?.classList.add('is-ready');
      },
      { once: true },
    );
    video.load();
  }

  type Estado = 'inicio' | 'recorriendo' | 'fin';
  let estado: Estado = 'inicio';
  let arranque = 0;
  let raf = 0;
  let cortar: (() => void) | null = null;

  const salida = () => track.getBoundingClientRect().bottom + window.scrollY;
  const scrollA = (y: number, duration: number) =>
    new Promise<void>((resolve) =>
      window.lenis ? window.lenis.scrollTo(y, { duration, lock: true, force: true, onComplete: () => resolve() }) : resolve(),
    );
  const tweenA = (t: number, duration: number, ease = 'power1.inOut') =>
    new Promise<void>((resolve) => {
      tl.tweenTo(t, { duration, ease, onComplete: () => resolve() });
    });

  // Mientras el video se reproduce, la línea de tiempo copia su posición en cada cuadro.
  const seguirVideo = () => {
    if (!video) return;
    tl.time(aLinea(video.currentTime));
    if (!video.paused && !video.ended) raf = requestAnimationFrame(seguirVideo);
  };

  const detenerVideo = () => {
    cancelAnimationFrame(raf);
    video?.pause();
  };

  const recorrer = async () => {
    estado = 'recorriendo';
    arranque = Date.now();
    let cortado = false;
    const corte = new Promise<void>((resolve) => (cortar = () => ((cortado = true), resolve())));

    await Promise.race([tweenA(0.9, 1.8), corte]);
    if (cortado) return;

    if (listo && video) {
      video.currentTime = tramos[1][0];
      await video.play().catch(() => {});
      raf = requestAnimationFrame(seguirVideo);
      const fin = new Promise<void>((resolve) => video.addEventListener('ended', () => resolve(), { once: true }));
      await Promise.race([fin, corte]);
    } else {
      // Sin video: los fotogramas se suceden con el mismo ritmo.
      for (let i = 2; i < n && !cortado; i++) await Promise.race([tweenA(i + 0.6, 3), corte]);
    }
    if (cortado) return;
    await terminar();
  };

  const terminar = async () => {
    cortar = null;
    detenerVideo();
    estado = 'fin';
    await tweenA(tl.duration(), 0.4, 'none');
    await scrollA(salida(), 1.3);
  };

  const volver = async () => {
    cortar?.();
    cortar = null;
    detenerVideo();
    estado = 'inicio';
    await scrollA(0, 0.9);
    await tweenA(0, 1.1);
    if (video) video.currentTime = 0;
  };

  // Una misma deslizada dispara varios eventos seguidos: se ignoran los del arranque.
  const reciente = () => Date.now() - arranque < 900;

  Observer.create({
    target: stage,
    type: 'touch',
    tolerance: 12,
    onUp: () => {
      if (estado === 'inicio' && window.scrollY < 10) recorrer();
      else if (estado === 'recorriendo' && !reciente()) {
        cortar?.();
        terminar();
      } else if (estado === 'fin') scrollA(salida(), 0.9);
    },
    onDown: () => {
      if (estado === 'recorriendo' && reciente()) return;
      if (estado !== 'inicio') volver();
    },
  });

  // iOS no pinta fotogramas de un video que nunca se reprodujo: play y pausa al primer toque.
  window.addEventListener(
    'touchstart',
    () => {
      if (video && estado === 'inicio') video.play().then(() => estado === 'inicio' && video.pause()).catch(() => {});
    },
    { once: true, passive: true },
  );
}

// ---------------------------------------------------------------------------
// Escritorio: mueve el video a un tiempo dado sin saturar al decodificador (un seek por cuadro).
function createScrubber(video: HTMLVideoElement, layer: HTMLElement | null) {
  let ready = false;
  let target = 0;
  let raf = 0;

  const apply = () => {
    raf = 0;
    if (ready && Math.abs(video.currentTime - target) > 1 / 48) video.currentTime = target;
  };
  const seek = (t: number) => {
    target = t;
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return { seek };

  // Se descarga entero como blob: así los saltos hacia atrás y adelante son instantáneos.
  const cargar = async () => {
    try {
      const res = await fetch(video.dataset.src!);
      if (!res.ok) throw new Error(String(res.status));
      video.src = URL.createObjectURL(await res.blob());
    } catch {
      return; // quedan los fotogramas de respaldo
    }
    video.addEventListener(
      'loadeddata',
      () => {
        ready = true;
        layer?.classList.add('is-ready');
        apply();
      },
      { once: true },
    );
    video.load();
  };

  if (document.readyState === 'complete') cargar();
  else window.addEventListener('load', cargar, { once: true });

  return { seek };
}
