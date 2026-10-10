// Todo el contenido de la landing vive acá. Los textos marcados con `pendiente`
// son propuestas que la marca tiene que confirmar antes de publicar (ver PENDIENTES.md).

import type { ImageMetadata } from 'astro';
import exterior from '../assets/fotos/local-exterior.jpg';
import pedidos from '../assets/fotos/equipo-pedidos.jpg';
import granel from '../assets/fotos/publicacion-06.jpg';
import infusiones from '../assets/fotos/publicacion-05.jpg';
import proteina from '../assets/fotos/publicacion-04.jpg';
import chocolates from '../assets/fotos/publicacion-10.jpg';
import panificados from '../assets/fotos/publicacion-09.jpg';
import exhibicion from '../assets/fotos/productos-exhibicion.jpg';
import mermeladas from '../assets/fotos/publicacion-08.jpg';
import barritas from '../assets/fotos/portada-reel-productos.jpg';
import panNube from '../assets/fotos/publicacion-panificados.jpg';

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
    alt: 'Fachada de El Almacén de Lola con su vidriera y el cartel verde',
    foco: '50% 62%',
  },
  {
    id: 'pedidos',
    etiqueta: 'Adentro',
    titulo: 'Cada pedido, armado a mano',
    texto: 'Desde las 8 de la mañana ya estamos preparando los pedidos del día, uno por uno.',
    foto: pedidos,
    alt: 'Integrante del equipo con delantal preparando pedidos en el mostrador',
  },
  {
    id: 'granel',
    etiqueta: 'Frutos secos',
    titulo: 'Frutos secos, semillas y algo rico para picar',
    texto: 'Almendras, nueces, castañas y mezclas para tener siempre a mano, en casa o en la mochila.',
    foto: granel,
    alt: 'Mano sosteniendo un paquete de galletitas frente a frascos y bolsas de frutos secos',
  },
  {
    id: 'infusiones',
    etiqueta: 'Infusiones',
    titulo: 'Yerbas e infusiones para cada momento',
    texto: 'Para el mate de la mañana, el té de la tarde o algo calentito antes de dormir.',
    foto: infusiones,
    alt: 'Cajas de infusiones de distintos sabores apiladas en un estante de madera',
  },
  {
    id: 'proteina',
    etiqueta: 'Para entrenar',
    titulo: 'Para entrenar y para la merienda',
    texto: 'Pastas de maní, opciones con proteína y barritas listas para llevar.',
    foto: proteina,
    alt: 'Frascos de pasta de maní con proteína ordenados en un estante',
  },
  {
    id: 'chocolates',
    etiqueta: 'Antojos',
    titulo: 'Antojos con mejores ingredientes',
    texto: 'Chocolates con más cacao, snacks y dulces para darte un gusto sin vueltas.',
    foto: chocolates,
    alt: 'Tabletas de chocolate con 45 y 60 por ciento de cacao',
  },
  {
    id: 'panificados',
    etiqueta: 'Panificados',
    titulo: 'Panificados para toda la semana',
    texto: 'Budines, panes y opciones para el desayuno que llegan frescos al almacén.',
    foto: panificados,
    alt: 'Budines y panes envueltos exhibidos en una mesa del almacén',
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

export const galeria = [
  { foto: exhibicion, alt: 'Exhibidor de madera con productos y carteles del almacén', texto: 'Cada rincón del almacén' },
  { foto: mermeladas, alt: 'Estantes con frascos de mermeladas y conservas', texto: 'Dulces y conservas' },
  { foto: barritas, alt: 'Barritas de frutos secos bañadas en chocolate', texto: 'Barritas de frutos secos' },
  { foto: panNube, alt: 'Pila de pan nube con la descripción del producto', texto: 'Pan nube' },
];

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
