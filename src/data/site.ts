// Todo el contenido de la landing vive acá. Los textos marcados con `pendiente`
// son propuestas que la marca tiene que confirmar antes de publicar (ver PENDIENTES.md).

import type { ImageMetadata } from 'astro';
// Selección revisada por dirección de arte (ver PENDIENTES.md). Cuando lleguen las
// versiones mejoradas o fotos nuevas, alcanza con cambiar el archivo importado.
import exterior from '../assets/fotos/local-exterior.jpg';
import pedidos from '../assets/fotos/equipo-pedidos.jpg';
import panificados from '../assets/fotos/publicacion-09.jpg';
import barritas from '../assets/fotos/barritas-frutos-secos.jpg';
import infusiones from '../assets/fotos/publicacion-05.jpg';
import proteina from '../assets/fotos/publicacion-04.jpg';
import mermeladas from '../assets/fotos/publicacion-08.jpg';

export { negocio, horarios, horariosResumen } from './negocio';

export interface Parada {
  id: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  foto: ImageMetadata;
  alt: string;
  /** Punto de la foto hacia el que hace zoom la cámara al pasar a la siguiente parada. */
  foco?: string;
}

// El recorrido del scroll: arranca en la vereda y entra al almacén.
export const recorrido: Parada[] = [
  {
    id: 'afuera',
    etiqueta: 'La vereda',
    titulo: 'Lo rico de elegir natural',
    texto: 'Frutos secos, yerbas, leches vegetales, panificados y mucho más. Te esperamos en Victoria de lunes a sábado.',
    foto: exterior,
    alt: 'Fachada de El Almacén de Lola: vidriera con hojas verdes pintadas, lámparas colgantes y góndolas de madera',
    // La cámara entra por la vidriera, a la altura de las lámparas y el "Lola" pintado.
    foco: '50% 45%',
  },
  {
    id: 'pedidos',
    etiqueta: 'Adentro',
    titulo: 'Cada pedido, armado a mano',
    texto: 'Desde las 8 de la mañana ya estamos preparando los pedidos del día, uno por uno.',
    foto: pedidos,
    alt: 'Integrante del equipo con delantal preparando pedidos en el mostrador, con góndolas de madera atrás',
  },
  {
    id: 'panificados',
    etiqueta: 'Panificados',
    titulo: 'Panificados para toda la semana',
    texto: 'Panes y budines para el desayuno y la merienda, con el sello de Lola.',
    foto: panificados,
    alt: 'Panes y budines envueltos sobre una mesa de madera, uno con el sticker de Lola',
  },
  {
    id: 'frutos-secos',
    etiqueta: 'Frutos secos',
    titulo: 'Frutos secos para darte un gusto',
    texto: 'Almendras, castañas, nueces y pistachos, solos o en barritas con chocolate.',
    foto: barritas,
    alt: 'Barritas de chocolate cubiertas con almendras, castañas, pistachos y nueces',
  },
  {
    id: 'infusiones',
    etiqueta: 'Infusiones',
    titulo: 'Yerbas e infusiones para cada momento',
    texto: 'Para el mate de la mañana, el té de la tarde o algo calentito antes de dormir.',
    foto: infusiones,
    alt: 'Cajas de infusiones ilustradas con flores y hojas, apiladas en un estante de madera',
  },
  {
    id: 'proteina',
    etiqueta: 'Para entrenar',
    titulo: 'Para entrenar y para la merienda',
    texto: 'Pastas de maní, opciones con proteína y barritas listas para llevar.',
    foto: proteina,
    alt: 'Frascos de pasta de maní con proteína ordenados en un estante de madera',
  },
  {
    id: 'despensa',
    etiqueta: 'Despensa',
    titulo: 'Una despensa con cosas ricas',
    texto: 'Mermeladas, conservas y frascos para completar la alacena de casa.',
    foto: mermeladas,
    alt: 'Dos estantes de madera llenos de frascos de mermelada con tapas rosas',
  },
];

// Categorías mencionadas por el equipo del local (las marcadas `pendiente` no están confirmadas).
export const categorias = [
  { icono: 'tea-bag', nombre: 'Yerbas e infusiones', detalle: 'Mate, té y hierbas' },
  { icono: 'drop', nombre: 'Leches vegetales', detalle: 'Almendra, coco, avena y más' },
  { icono: 'bowl-food', nombre: 'Yogures', detalle: 'Opciones vegetales y tradicionales' },
  { icono: 'nut', nombre: 'Frutos secos y semillas', detalle: 'Almendras, nueces, mezclas' },
  { icono: 'barbell', nombre: 'Barritas y proteínas', detalle: 'Para entrenar o para llevar' },
  { icono: 'snowflake', nombre: 'Congelados', detalle: 'Listos para resolver la semana' },
  { icono: 'bread', nombre: 'Panificados', detalle: 'Budines, panes y galletitas' },
  { icono: 'jar-label', nombre: 'Dulces y untables', detalle: 'Mermeladas, pastas de maní' },
  { icono: 'cookie', nombre: 'Chocolates y snacks', detalle: 'Para darte un gusto' },
  { icono: 'leaf', nombre: 'Productos orgánicos', detalle: 'Te ayudamos a reconocerlos', pendiente: true },
  { icono: 'carrot', nombre: 'Bolsón de verduras', detalle: 'Encargalo por Instagram', pendiente: true },
];

// Galería oculta hasta tener fotos del local con nivel (interior amplio, góndolas,
// granel, mostrador). Si queda vacía, la sección no se muestra.
export const galeria: Array<{ foto: ImageMetadata; alt: string; texto: string }> = [];

export const tagline =
  'Comer mejor no tendría que ser complicado. Por eso juntamos lo rico y lo natural en un solo lugar, cerca de casa.';

export const preguntas = [
  {
    p: '¿Dónde queda el almacén?',
    r: 'Estamos en Av. Presidente Perón 3099, en Victoria, partido de San Fernando. Tocá "Cómo llegar" y Google Maps te arma el recorrido.',
  },
  {
    p: '¿Qué horarios tienen?',
    r: 'De lunes a viernes de 8 a 20 h y los sábados de 9 a 20 h. Los domingos el almacén está cerrado.',
  },
  {
    p: '¿Puedo consultar precios o si tienen un producto antes de ir?',
    r: 'Sí. Escribinos por mensaje directo en Instagram a @lolasaludable y te respondemos.',
    pendiente: true,
  },
  {
    p: '¿Tienen productos sin TACC?',
    r: 'Tenemos opciones. Fijate siempre que el envase tenga el logo oficial "sin TACC" y, si tenés dudas, preguntanos en el local.',
    pendiente: true,
  },
  {
    p: '¿Cómo encargo el bolsón de verduras?',
    r: 'Lo anunciamos en nuestras historias de Instagram con el contenido y el día de retiro. Escribinos por mensaje para reservarlo.',
    pendiente: true,
  },
  {
    p: '¿Venden productos orgánicos?',
    r: 'Sí. En la historia destacada "¿Es orgánico?" de nuestro Instagram te contamos cómo reconocer un producto orgánico certificado.',
    pendiente: true,
  },
];
