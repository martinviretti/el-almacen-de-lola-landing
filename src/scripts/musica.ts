// Música generada en el navegador con Web Audio: chill lo-fi con swing. Batería suave
// (bombo, caja, hi-hats), bajo con groove, piano eléctrico jazzero y una melodía liviana
// con eco. No usa archivos ni licencias.
// Suena si la persona toca el botón, o sola con la primera deslizada del recorrido del
// celular (ver recorrido-movil.ts); si la apaga, no vuelve a arrancar. Se apaga sola al
// cambiar de pestaña.
//
// Para usar una pista propia (con licencia): poner el MP3 en public/audio/musica.mp3 y
// cambiar PISTA a '/audio/musica.mp3'. El botón la reproduce en loop en lugar del generador.
const PISTA: string | null = null;

const BPM = 92;
const PULSO = 60 / BPM;
const PASO = PULSO / 4; // semicorchea
const SWING = 0.28; // cuánto se atrasan las semicorcheas impares (groove "arrastrado")
const COMPASES = 4;

// ii–V–I–vi en Do mayor: Dm9 → G13 → Cmaj9 → Am11. Notas MIDI.
const ACORDES = [
  { bajo: 38, notas: [53, 57, 60, 64] },
  { bajo: 43, notas: [53, 59, 62, 64] },
  { bajo: 36, notas: [55, 59, 62, 64] },
  { bajo: 45, notas: [55, 59, 60, 64] },
];
// Pentatónica de Re menor para la melodía.
const ESCALA = [62, 65, 67, 69, 72, 74, 77, 79];

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const azar = (p: number) => Math.random() < p;

interface Motor {
  encender(): Promise<void>;
  apagar(): void;
}

function crearGenerador(): Motor {
  let ctx: AudioContext | null = null;
  let master: GainNode;
  let entrada: GainNode; // con reverb: teclas, caja, melodía
  let seco: GainNode; // sin reverb: bombo, bajo, hi-hats
  let eco: GainNode;
  let ruido: AudioBuffer;
  let timer = 0;
  let proximo = 0;
  let paso = 0;
  let idxMelodia = 3;

  const armar = () => {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0;

    // Compresor para que la batería y los acordes suenen "pegados", más volumen de salida
    // y un limitador al final para que los golpes nunca saturen.
    const compresor = ctx.createDynamicsCompressor();
    compresor.threshold.value = -28;
    compresor.knee.value = 12;
    compresor.ratio.value = 4;
    compresor.attack.value = 0.012;
    compresor.release.value = 0.25;
    const salida = ctx.createGain();
    salida.gain.value = 1.15;
    const limitador = ctx.createDynamicsCompressor();
    limitador.threshold.value = -4;
    limitador.knee.value = 0;
    limitador.ratio.value = 20;
    limitador.attack.value = 0.002;
    limitador.release.value = 0.1;
    master.connect(compresor);
    compresor.connect(salida);
    salida.connect(limitador);
    limitador.connect(ctx.destination);

    const filtro = ctx.createBiquadFilter();
    filtro.type = 'lowpass';
    filtro.frequency.value = 3400;

    // Reverb: respuesta al impulso de ruido que se apaga en ~2,2 s.
    const largo = Math.floor(ctx.sampleRate * 2.2);
    const impulso = ctx.createBuffer(2, largo, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = impulso.getChannelData(c);
      for (let i = 0; i < largo; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / largo) ** 2.5;
    }
    const reverb = ctx.createConvolver();
    reverb.buffer = impulso;
    const humedo = ctx.createGain();
    humedo.gain.value = 0.28;

    entrada = ctx.createGain();
    entrada.connect(filtro);
    filtro.connect(master);
    filtro.connect(reverb);
    reverb.connect(humedo);
    humedo.connect(master);

    seco = ctx.createGain();
    seco.connect(master);

    // Eco con rebote de corchea con puntillo, oscuro, para la melodía.
    const retraso = ctx.createDelay(1);
    retraso.delayTime.value = PULSO * 0.75;
    const realimenta = ctx.createGain();
    realimenta.gain.value = 0.38;
    const oscuro = ctx.createBiquadFilter();
    oscuro.type = 'lowpass';
    oscuro.frequency.value = 2200;
    eco = ctx.createGain();
    eco.connect(retraso);
    retraso.connect(oscuro);
    oscuro.connect(realimenta);
    realimenta.connect(retraso);
    oscuro.connect(filtro);

    ruido = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const r = ruido.getChannelData(0);
    for (let i = 0; i < r.length; i++) r[i] = Math.random() * 2 - 1;
  };

  const nota = (
    midi: number,
    t: number,
    dur: number,
    vol: number,
    tipo: OscillatorType,
    ataque: number,
    destino: AudioNode = entrada,
  ) => {
    const c = ctx!;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + ataque);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(destino);
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

  // Piano eléctrico: dos senos apenas desafinados + un armónico corto (campanita).
  const tecla = (midi: number, t: number, vol: number, dur: number, destino: AudioNode = entrada) => {
    const c = ctx!;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(destino);
    for (const [mult, v, desafine] of [
      [1, 1, -5],
      [1, 1, 5],
      [2, 0.22, 0],
    ] as const) {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.value = hz(midi) * mult;
      o.detune.value = desafine;
      const gg = c.createGain();
      gg.gain.value = v * (mult === 2 ? 0.6 : 0.5);
      o.connect(gg);
      gg.connect(g);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  };

  const bajo = (midi: number, t: number, dur: number, vol: number) => {
    const c = ctx!;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 520;
    f.connect(g);
    g.connect(seco);
    for (const tipo of ['sine', 'triangle'] as OscillatorType[]) {
      const o = c.createOscillator();
      o.type = tipo;
      o.frequency.value = hz(midi);
      o.connect(f);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  };

  const bombo = (t: number, vol: number) => {
    const c = ctx!;
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(135, t);
    o.frequency.exponentialRampToValueAtTime(46, t + 0.12);
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
    o.connect(g);
    g.connect(seco);
    o.start(t);
    o.stop(t + 0.4);
  };

  const soplo = (t: number, dur: number, vol: number, tipo: BiquadFilterType, frec: number, destino: AudioNode) => {
    const c = ctx!;
    const s = c.createBufferSource();
    s.buffer = ruido;
    const f = c.createBiquadFilter();
    f.type = tipo;
    f.frequency.value = frec;
    f.Q.value = tipo === 'bandpass' ? 0.9 : 0.7;
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f);
    f.connect(g);
    g.connect(destino);
    s.start(t, Math.random() * 0.5);
    s.stop(t + dur + 0.02);
  };

  const caja = (t: number, vol: number) => {
    soplo(t, 0.17, vol, 'bandpass', 1900, entrada);
    nota(54, t, 0.1, vol * 0.5, 'triangle', 0.002, entrada); // cuerpo
  };
  const hat = (t: number, vol: number, abierto = false) => soplo(t, abierto ? 0.2 : 0.035, vol, 'highpass', 7500, seco);

  const programar = () => {
    const c = ctx!;
    while (proximo < c.currentTime + 0.4) {
      const compas = Math.floor(paso / 16) % COMPASES;
      const acorde = ACORDES[compas];
      const s = paso % 16;
      const intro = paso < 16; // primer compás: solo teclas y colchón, para entrar de a poco
      // Las semicorcheas impares se atrasan un poco (swing) y todo tiene una pizca humana.
      const t = proximo + (s % 2 ? SWING * PASO : 0) + (Math.random() - 0.5) * 0.008;

      // Colchón
      if (s === 0) acorde.notas.forEach((n) => nota(n, t, PULSO * 4.2, 0.016, 'triangle', 0.5));

      // Batería
      if (!intro) {
        if (s === 0) bombo(t, 0.55);
        if (s === 7 && azar(0.55)) bombo(t, 0.32);
        if (s === 10) bombo(t, 0.45);
        if (s === 14 && compas === 3 && azar(0.5)) bombo(t, 0.3);
        if (s === 4 || s === 12) caja(t, 0.26);
        if (s === 15 && azar(0.25)) caja(t, 0.07); // nota fantasma
      }
      if (s % 2 === 0) hat(t, s % 4 === 2 ? 0.075 : 0.045);
      else if (!intro && azar(0.28)) hat(t, 0.025);
      if (s === 14 && !intro && azar(0.55)) hat(t, 0.05, true);

      // Bajo
      if (!intro) {
        if (s === 0) bajo(acorde.bajo, t, PASO * 3.2, 0.22);
        if (s === 3 && azar(0.45)) bajo(acorde.bajo + 12, t, PASO * 1.5, 0.12);
        if (s === 6) bajo(acorde.bajo + 7, t, PASO * 2.4, 0.17);
        if (s === 10) bajo(acorde.bajo, t, PASO * 2.6, 0.2);
        if (s === 13 && azar(0.5)) bajo(acorde.bajo + 5, t, PASO * 1.8, 0.13);
      }

      // Piano eléctrico: acorde largo al inicio y respuestas sincopadas
      if (s === 0) acorde.notas.forEach((n, i) => tecla(n, t + i * 0.012, 0.05, PULSO * 3));
      if (s === 6 && azar(0.85)) acorde.notas.slice(1).forEach((n) => tecla(n, t, 0.034, PULSO * 1.2));
      if (s === 11 && azar(0.55)) acorde.notas.slice(0, 3).forEach((n) => tecla(n, t, 0.03, PULSO * 1.1));

      // Melodía liviana con eco: camina por la escala y descansa seguido
      if (!intro && [2, 6, 8, 11, 14].includes(s) && azar(compas % 2 ? 0.55 : 0.32)) {
        idxMelodia = Math.min(ESCALA.length - 1, Math.max(0, idxMelodia + Math.round((Math.random() - 0.5) * 4)));
        const m = ESCALA[idxMelodia];
        tecla(m, t, 0.04, PULSO * 1.4);
        tecla(m, t, 0.03, PULSO * 1.4, eco);
      }

      proximo += PASO;
      paso++;
    }
  };

  return {
    async encender() {
      if (!ctx) armar();
      await ctx!.resume();
      proximo = ctx!.currentTime + 0.1;
      paso = 0;
      master.gain.cancelScheduledValues(ctx!.currentTime);
      master.gain.setTargetAtTime(0.85, ctx!.currentTime, 0.6);
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

  // El navegador solo deja sonar después de un toque: si la deslizada todavía no cuenta como
  // toque (recién cuenta al levantar el dedo), se espera a ese momento.
  let decidio = false;
  const arrancarSola = () => {
    if (decidio || sonando) return;
    decidio = true;
    if (navigator.userActivation?.isActive) return void alternar();
    document.addEventListener('touchend', () => !sonando && alternar(), { once: true, capture: true });
  };
  document.addEventListener('lola:primera-deslizada', arrancarSola, { once: true });

  botones.forEach((b) =>
    b.addEventListener('click', () => {
      decidio = true;
      alternar();
    }),
  );
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && sonando) alternar();
  });
  pintar();
}
