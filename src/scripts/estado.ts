import { horarios } from '../data/negocio';

// Calcula si el almacén está abierto según la hora de Buenos Aires,
// sin importar la zona horaria del dispositivo.
function ahoraEnBuenosAires() {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? '';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { dia, hora: Number(get('hour')) + Number(get('minute')) / 60 };
}

export function estadoActual() {
  const { dia, hora } = ahoraEnBuenosAires();
  const hoy = horarios[dia];

  if (hoy.abre !== null && hoy.cierra !== null && hora >= hoy.abre && hora < hoy.cierra) {
    return { abierto: true, texto: `Abierto ahora · cierra a las ${hoy.cierra} h` };
  }
  if (hoy.abre !== null && hora < hoy.abre) {
    return { abierto: false, texto: `Cerrado · abre hoy a las ${hoy.abre} h` };
  }
  for (let k = 1; k <= 7; k++) {
    const d = (dia + k) % 7;
    const h = horarios[d];
    if (h.abre === null) continue;
    const cuando = k === 1 ? 'mañana' : `el ${h.dia.toLowerCase()}`;
    return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${h.abre} h` };
  }
  return { abierto: false, texto: 'Consultá nuestros horarios' };
}

export function initEstado() {
  const pintar = () => {
    const { abierto, texto } = estadoActual();
    document.querySelectorAll<HTMLElement>('[data-estado]').forEach((el) => (el.textContent = texto));
    document.querySelectorAll<HTMLElement>('[data-estado-punto]').forEach((el) => {
      el.classList.toggle('bg-marca', abierto);
      el.classList.toggle('bg-texto-2', !abierto);
    });
    document.querySelectorAll<HTMLElement>('[data-estado-ping]').forEach((el) => {
      el.classList.toggle('animate-ping', abierto);
      el.classList.toggle('hidden', !abierto);
    });
    document.querySelectorAll<HTMLElement>('[data-hoy]').forEach((el) => {
      el.toggleAttribute('data-es-hoy', Number(el.dataset.hoy) === ahoraEnBuenosAires().dia);
    });
  };
  pintar();
  setInterval(pintar, 60_000);
}
