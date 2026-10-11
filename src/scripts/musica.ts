// Música ambiental generada en el navegador con Web Audio: acordes suaves tipo
// piano eléctrico, un pad cálido y un bajo tranquilo. No usa archivos ni licencias.
// Solo suena si la persona toca el botón; se apaga sola al cambiar de pestaña.
//
// Para usar una pista propia: poner el MP3 en public/audio/musica.mp3 y cambiar
// PISTA a '/audio/musica.mp3'. El botón la reproduce en loop en lugar del generador.
const PISTA: string | null = null;

const BPM = 72;
const PULSO = 60 / BPM;
const COMPAS = PULSO * 4;

// Progresión cálida (Fmaj9 → Em7 → Dm9 → Cmaj7), en frecuencias MIDI.
const ACORDES = [
  { bajo: 41, notas: [57, 60, 64, 67] },
  { bajo: 40, notas: [55, 59, 62, 64] },
  { bajo: 38, notas: [53, 57, 60, 64] },
  { bajo: 36, notas: [55, 59, 60, 64] },
];

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

interface Motor {
  encender(): Promise<void>;
  apagar(): void;
}

function crearGenerador(): Motor {
  let ctx: AudioContext | null = null;
  let master: GainNode;
  let entrada: GainNode;
  let timer = 0;
  let proximo = 0;
  let paso = 0;

  const armar = () => {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 2400;

    // Reverb: respuesta al impulso de ruido que se apaga en ~3 s.
    const largo = ctx.sampleRate * 3;
    const impulso = ctx.createBuffer(2, largo, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = impulso.getChannelData(c);
      for (let i = 0; i < largo; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / largo) ** 2.5;
    }
    const reverb = ctx.createConvolver();
    reverb.buffer = impulso;
    const humedo = ctx.createGain();
    humedo.gain.value = 0.35;

    entrada = ctx.createGain();
    entrada.connect(filtro);
    filtro.connect(master);
    filtro.connect(reverb);
    reverb.connect(humedo);
    humedo.connect(master);
    master.connect(ctx.destination);
  };

  const nota = (midi: number, t: number, dur: number, vol: number, tipo: OscillatorType, ataque: number) => {
    const c = ctx!;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + ataque);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(entrada);
    for (const desafine of tipo === 'triangle' ? [-6, 6] : [0]) {
      const o = c.createOscillator();
      o.type = tipo;
      o.frequency.value = hz(midi);
      o.detune.value = desafine;
      o.connect(g);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  };

  // Piano eléctrico: seno con un poco de armónico, ataque corto y caída larga.
  const tecla = (midi: number, t: number, vol: number) => {
    nota(midi, t, 2.2, vol, 'sine', 0.01);
    nota(midi + 12, t, 0.9, vol * 0.18, 'sine', 0.005);
  };

  const programar = () => {
    const c = ctx!;
    while (proximo < c.currentTime + 0.4) {
      const acorde = ACORDES[Math.floor(paso / 8) % ACORDES.length];
      const corchea = paso % 8;
      const t = proximo + (Math.random() - 0.5) * 0.015; // un poco humano

      if (corchea === 0) {
        acorde.notas.forEach((n) => nota(n, t, COMPAS * 1.15, 0.022, 'triangle', 0.9)); // pad
        nota(acorde.bajo, t, PULSO * 3, 0.09, 'sine', 0.02);
        tecla(acorde.notas[0], t, 0.05);
        tecla(acorde.notas[2], t + 0.02, 0.04);
      }
      if (corchea === 4) nota(acorde.bajo + 7, t, PULSO * 2, 0.06, 'sine', 0.02);
      // Arpegio suelto: no toca en todas las corcheas, así respira.
      if (corchea !== 0 && Math.random() < 0.55) {
        const n = acorde.notas[Math.floor(Math.random() * acorde.notas.length)] + (Math.random() < 0.3 ? 12 : 0);
        tecla(n, t, 0.025 + Math.random() * 0.015);
      }

      proximo += PULSO / 2;
      paso++;
    }
  };

  return {
    async encender() {
      if (!ctx) armar();
      await ctx!.resume();
      proximo = ctx!.currentTime + 0.1;
      master.gain.cancelScheduledValues(ctx!.currentTime);
      master.gain.setTargetAtTime(0.5, ctx!.currentTime, 0.8);
      programar();
      timer = window.setInterval(programar, 100);
    },
    apagar() {
      if (!ctx) return;
      window.clearInterval(timer);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
      const c = ctx;
      window.setTimeout(() => c.state === 'running' && c.suspend(), 1500);
    },
  };
}

function crearPista(src: string): Motor {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.35;
  return {
    encender: () => audio.play(),
    apagar: () => audio.pause(),
  };
}

export function initMusica() {
  const botones = [...document.querySelectorAll<HTMLButtonElement>('[data-musica]')];
  if (!botones.length) return;

  let motor: Motor | null = null;
  let sonando = false;

  const pintar = () =>
    botones.forEach((b) => {
      b.setAttribute('aria-pressed', String(sonando));
      b.setAttribute('aria-label', sonando ? 'Apagar la música' : 'Poner música ambiental');
    });

  const alternar = async () => {
    motor ??= PISTA ? crearPista(PISTA) : crearGenerador();
    sonando = !sonando;
    pintar();
    try {
      if (sonando) await motor.encender();
      else motor.apagar();
    } catch {
      sonando = false;
      pintar();
    }
  };

  botones.forEach((b) => b.addEventListener('click', alternar));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && sonando) alternar();
  });
  pintar();
}
