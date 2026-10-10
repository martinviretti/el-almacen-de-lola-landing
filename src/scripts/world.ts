import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Cada cambio de parada ocupa una unidad de la línea de tiempo. El scroll del
// track (ver ScrollWorld.astro) se reparte entre esas unidades.
export function initWorld(world: HTMLElement) {
  const track = world.querySelector<HTMLElement>('.world-track')!;
  const stops = [...world.querySelectorAll<HTMLElement>('[data-stop]')];
  const copies = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-copy]')!);
  const reveals = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-reveal]')!);
  const medias = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-media]')!);
  const imgs = stops.map((s) => s.querySelector<HTMLElement>('[data-stop-img]')!);
  const rail = [...world.querySelectorAll<HTMLElement>('[data-rail]')];
  const bg = world.querySelector<HTMLElement>('[data-world-bg]');
  const hint = world.querySelector<HTMLElement>('[data-scroll-hint]');

  const n = stops.length;
  let active = -1;

  const setActive = (i: number) => {
    if (i === active) return;
    active = i;
    copies.forEach((c, k) => c.classList.toggle('is-active', k === i));
    rail.forEach((r, k) => {
      r.classList.toggle('is-active', k === i);
      r.classList.toggle('is-done', k < i);
    });
  };
  setActive(0);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
      onUpdate: (self) => {
        // La parada pasa a activa cuando su texto empieza a entrar (at + 0.3).
        const t = self.progress * tl.duration();
        setActive(Math.min(n - 1, Math.max(0, Math.floor(t + 0.35))));
      },
    },
  });

  if (hint) tl.to(hint, { autoAlpha: 0, y: -16, duration: 0.2 }, 0);
  if (bg) tl.to(bg, { yPercent: -12, duration: n - 1 }, 0);

  for (let i = 1; i < n; i++) {
    // Cada unidad: 0.35 de pausa para leer, 0.6 de transición.
    const at = i - 1 + 0.35;
    const entrando = i === 1; // de la vereda al interior: la cámara cruza la puerta
    const foco = imgs[0].style.transformOrigin || '50% 50%';

    // Sale la parada anterior.
    tl.to(
      copies[i - 1],
      { opacity: 0, y: -40, filter: 'blur(10px)', duration: 0.2, ease: 'power2.in' },
      at,
    );
    tl.to(
      imgs[i - 1],
      entrando
        ? { scale: 2.1, filter: 'brightness(0.55)', duration: 0.6, ease: 'power2.in' }
        : { scale: 1.12, yPercent: -6, filter: 'brightness(0.7)', duration: 0.6, ease: 'power1.inOut' },
      at,
    );

    // Entra la nueva: en la puerta se abre en círculo, después en cortina desde abajo.
    tl.fromTo(
      reveals[i],
      { clipPath: entrando ? `circle(0% at ${foco})` : 'inset(100% 0% 0% 0%)' },
      {
        clipPath: entrando ? `circle(150% at ${foco})` : 'inset(0% 0% 0% 0%)',
        duration: entrando ? 0.5 : 0.55,
        ease: 'power2.inOut',
      },
      at + (entrando ? 0.1 : 0),
    );
    tl.fromTo(
      imgs[i],
      { scale: entrando ? 1.5 : 1.3, yPercent: entrando ? 0 : 8 },
      { scale: 1, yPercent: 0, duration: 0.6, ease: 'power2.out' },
      at + (entrando ? 0.1 : 0),
    );
    tl.set(medias[i], { boxShadow: '0 32px 64px -24px rgb(33 76 59 / 0.35)' }, at);

    tl.fromTo(
      copies[i],
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.25, ease: 'power2.out' },
      at + 0.3,
    );
  }

  // Pausa final para leer la última parada antes de soltar el escenario.
  tl.to({}, { duration: 0.4 });

  // Las fotos cargan perezosas: recalcular cuando terminen.
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
