import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

// Línea de tiempo del recorrido (1 unidad por parada):
//   0 → 1   la fachada: pausa, y la cámara entra por la puerta al arco.
//   i → i+1 parada i: el video recorre su tramo; el texto cambia en el borde.
// El scroll del track (ver ScrollWorld.astro) se reparte entre esas unidades.
// En celular, además, cada deslizada avanza exactamente una parada (initPasos).
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
  setActive(0);

  const scrub = video ? createScrubber(video, videoLayer, movil) : null;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      // "En el recorrido" incluye la fachada: desde el inicio hasta que se suelta el escenario.
      onLeave: () => document.documentElement.classList.remove('en-recorrido'),
      onEnterBack: () => document.documentElement.classList.add('en-recorrido'),
      onUpdate: (self) => {
        const t = self.progress * tl.duration();
        setActive(t < 0.85 ? 0 : Math.min(n - 1, Math.floor(t + 0.1)));
      },
    },
  });

  // Al cargar, ScrollTrigger todavía no midió: se decide con la posición real del track.
  document.documentElement.classList.toggle('en-recorrido', track.getBoundingClientRect().bottom > window.innerHeight);

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

  if (movil) initPasos(world.querySelector<HTMLElement>('.world-stage')!, tl, n);
}

// Celular: el escenario no scrollea solo (touch-action: none).
// - Desde la fachada, una deslizada arranca el recorrido automático: la cámara camina
//   por todas las paradas (con una pausa para leer cada texto) y termina en la frase
//   principal. Una deslizada durante el recorrido lo frena en la parada siguiente.
// - Si se vuelve al recorrido, cada deslizada avanza o retrocede una sola parada.
function initPasos(stage: HTMLElement, tl: gsap.core.Timeline, n: number) {
  const st = tl.scrollTrigger!;
  // Punto de lectura de cada parada: el texto ya entró y el video recorrió casi todo su tramo.
  const marcas = Array.from({ length: n }, (_, i) => (i === 0 ? 0 : i + 0.7));
  const yDe = (t: number) => st.start + (t / tl.duration()) * (st.end - st.start);
  // El track termina (end) cuando su borde inferior toca el de la pantalla: la sección
  // siguiente (la frase principal) arranca una pantalla más abajo.
  const salida = () => st.end + window.innerHeight;
  let animando = false;
  let automatico = false;
  let frenar = false;
  let arranque = 0;

  const actual = () => {
    const y = window.scrollY;
    if (y > yDe(marcas[n - 1]) + 4) return y >= st.end - 2 ? n : n - 1;
    const t = ((y - st.start) / (st.end - st.start)) * tl.duration();
    return marcas.reduce((mejor, m, i) => (Math.abs(m - t) < Math.abs(marcas[mejor] - t) ? i : mejor), 0);
  };

  const scrollA = (y: number, duration: number) =>
    new Promise<void>((resolve) =>
      window.lenis ? window.lenis.scrollTo(y, { duration, lock: true, force: true, onComplete: () => resolve() }) : resolve(),
    );
  const esperar = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

  const recorridoAutomatico = async () => {
    automatico = animando = true;
    frenar = false;
    arranque = Date.now();
    for (let i = 1; i < n && !frenar; i++) {
      await scrollA(yDe(marcas[i]), i === 1 ? 2.6 : 2.2);
      if (!frenar) await esperar(1200);
    }
    if (!frenar) await scrollA(salida(), 1.4);
    automatico = animando = false;
  };

  const ir = (destino: number) => {
    if (animando || destino < 0) return;
    const desde = actual();
    if (destino === desde && destino < n) return;
    if (desde === 0 && destino === 1) {
      recorridoAutomatico();
      return;
    }
    animando = true;
    const y = destino >= n ? salida() : yDe(marcas[destino]);
    scrollA(y, 1.3).then(() => window.setTimeout(() => (animando = false), 120));
  };

  // Una misma deslizada dispara varios eventos seguidos: solo frena una deslizada nueva.
  const pedirFreno = () => {
    if (Date.now() - arranque > 900) frenar = true;
  };

  Observer.create({
    target: stage,
    type: 'touch',
    tolerance: 12,
    onUp: () => (automatico ? pedirFreno() : ir(actual() + 1)),
    onDown: () => (automatico ? pedirFreno() : ir(actual() - 1)),
  });
}

// Mueve el video a un tiempo dado sin saturar al decodificador: un seek por frame.
function createScrubber(video: HTMLVideoElement, layer: HTMLElement | null, movil: boolean) {
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
      // En celular, el cuadro completo (sin recorte) para llenar la pantalla.
      const src = (movil && video.dataset.srcMovil) || video.dataset.src!;
      const res = await fetch(src);
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

  // iOS no pinta fotogramas de un video que nunca se reprodujo: play y pausa al primer toque.
  const desbloquear = () => {
    video.play().then(() => video.pause()).catch(() => {});
  };
  window.addEventListener('touchstart', desbloquear, { once: true, passive: true });

  return { seek };
}
