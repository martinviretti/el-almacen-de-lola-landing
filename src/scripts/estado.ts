// "Abierto ahora" con el horario real del local, en hora de Argentina (aunque el aparato esté en
// otra zona). Pinta todos los [data-estado]: el texto va en [data-estado-texto]. Con
// data-estado="corto" usa la versión breve (la barra del celular). Sin JS queda el resumen del HTML.
import { horarios } from '../data/negocio';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** Día de la semana (0 = domingo) y hora decimal en Buenos Aires. */
function ahoraEnArgentina() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const valor = (t: string) => partes.find((p) => p.type === t)?.value ?? '';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(valor('weekday'));
  return { dia, hora: Number(valor('hour')) + Number(valor('minute')) / 60 };
}

export function estadoDelLocal() {
  const { dia, hora } = ahoraEnArgentina();
  const hoy = horarios[dia];
  if (hoy.abre !== null && hoy.cierra !== null && hora >= hoy.abre && hora < hoy.cierra) {
    return { abierto: true, largo: `Abierto ahora · hasta las ${hoy.cierra} h`, corto: `Abierto · hasta ${hoy.cierra} h` };
  }
  if (hoy.abre !== null && hora < hoy.abre) {
    return { abierto: false, largo: `Cerrado · abre hoy a las ${hoy.abre} h`, corto: `Abre hoy ${hoy.abre} h` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const h = horarios[d];
    if (h.abre === null) continue;
    const cuando = i === 1 ? 'mañana' : `el ${DIAS[d]}`;
    return { abierto: false, largo: `Cerrado · abre ${cuando} a las ${h.abre} h`, corto: `Abre ${cuando} ${h.abre} h` };
  }
  return { abierto: false, largo: 'Cerrado', corto: 'Cerrado' };
}

export function pintarEstado() {
  const e = estadoDelLocal();
  document.querySelectorAll<HTMLElement>('[data-estado]').forEach((el) => {
    const corto = el.dataset.estado === 'corto' || el.dataset.forma === 'corto';
    el.dataset.forma = corto ? 'corto' : 'largo';
    el.dataset.estado = e.abierto ? 'abierto' : 'cerrado';
    const texto = el.querySelector<HTMLElement>('[data-estado-texto]');
    if (texto) texto.textContent = corto ? e.corto : e.largo;
  });
}
