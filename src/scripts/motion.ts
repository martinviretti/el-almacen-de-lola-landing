import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWorld } from './world';
import { initMusica } from './musica';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

gsap.registerPlugin(ScrollTrigger);

const motion = document.documentElement.classList.contains('motion');

// Scroll suave sincronizado con ScrollTrigger.
if (motion) {
  const lenis = new Lenis({ autoRaf: false, anchors: { offset: 0 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;
}

// Entradas al aparecer: IntersectionObserver, nunca un listener de scroll.
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      reveal.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -10% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

// Recorrido por el almacén.
const world = document.querySelector<HTMLElement>('[data-world]');
if (world && motion) initWorld(world);

// Frase principal: cada palabra se ilumina una a una, en orden de lectura.
document.querySelectorAll<HTMLElement>('[data-words]').forEach((block) => {
  const words = [...block.querySelectorAll<HTMLElement>('[data-word]')];
  if (!motion) {
    words.forEach((w) => w.classList.add('is-lit'));
    return;
  }
  ScrollTrigger.create({
    trigger: block,
    start: 'top 80%',
    end: 'bottom 45%',
    onUpdate: (self) => {
      const lit = Math.round(self.progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    },
  });
});

// Parallax suave en las fotos de la galería.
if (motion) {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -6 },
      { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

// Franja "Del almacén a tu mesa": se desliza de costado mientras pasa por la pantalla.
if (motion) {
  document.querySelectorAll<HTMLElement>('[data-carrusel]').forEach((section) => {
    const track = section.querySelector<HTMLElement>('[data-carrusel-track]');
    if (!track) return;
    gsap.to(track, {
      x: () => -Math.max(0, track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    });
  });
}

// Categorías: arrancan desparramadas y llegan a su lugar desde distintos lados con el scroll.
if (motion) {
  document.querySelectorAll<HTMLElement>('[data-desorden-grid]').forEach((grid) => {
    const cards = [...grid.querySelectorAll<HTMLElement>('[data-desorden]')];
    // Pseudoaleatorio fijo por tarjeta: el desorden es siempre el mismo.
    const azar = (i: number, k: number) => {
      const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    const chico = window.innerWidth < 768;
    gsap.from(cards, {
      x: (i) => (azar(i, 1) - 0.5) * (chico ? 360 : 960),
      y: (i) => (azar(i, 2) - 0.3) * (chico ? 320 : 520),
      rotation: (i) => (azar(i, 3) - 0.5) * 48,
      scale: (i) => 0.75 + azar(i, 4) * 0.25,
      opacity: 0.4,
      ease: 'power3.out',
      stagger: { each: 0.05, from: 'random' },
      scrollTrigger: { trigger: grid, start: 'top 95%', end: 'center 60%', scrub: 0.8 },
    });
  });
}

initMusica();
