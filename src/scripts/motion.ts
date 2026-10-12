import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initWorld } from './world';
import { initRecorridoMovil } from './recorrido-movil';
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

// Recorrido por la almacén: en escritorio atado al scroll, en celular tipo historias.
const esMovil = window.matchMedia('(max-width: 1023px)').matches;
const world = document.querySelector<HTMLElement>('[data-world]');
if (world && motion && !esMovil) initWorld(world);
const recorridoMovil = document.querySelector<HTMLElement>('[data-rm]');
if (recorridoMovil && motion && esMovil) initRecorridoMovil(recorridoMovil);

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
    // En celular termina antes: al llegar desde el recorrido automático ya se ve entera.
    end: window.matchMedia('(max-width: 1023px)').matches ? 'center 70%' : 'bottom 45%',
    onUpdate: (self) => {
      const lit = Math.round(self.progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    },
  });
});

initMusica();
