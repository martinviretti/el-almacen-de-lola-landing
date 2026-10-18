import Lenis from 'lenis';
import { pintarEstado } from './estado';

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const motion = document.documentElement.classList.contains('motion');

// Scroll suave. Al saltar a una sección desde el menú, frena un poco antes para que la barra
// de arriba no tape el título.
if (motion) window.lenis = new Lenis({ autoRaf: true, anchors: { offset: -96 } });

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

// "Abierto ahora": se calcula al cargar y se repasa cada minuto.
pintarEstado();
setInterval(pintarEstado, 60_000);
