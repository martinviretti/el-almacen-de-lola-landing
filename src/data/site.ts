// Todo el contenido de la landing vive acá. Los textos marcados con `pendiente`
// son propuestas que la marca tiene que confirmar antes de publicar (ver PENDIENTES.md).

import type { ImageMetadata } from 'astro';
import { url } from '../lib/url';

// Fotos reales del local. Las interiores vienen de Google Maps (ver `credito`):
// hace falta permiso de sus autoras antes de publicar.
import fachada from '../assets/local/fachada.jpg';
import mostrador from '../assets/local/mostrador.jpg';
import pasillo from '../assets/local/pasillo.jpg';
import granelLamparas from '../assets/local/granel-lamparas.jpg';
import exhibidores from '../assets/local/exhibidores.jpg';

// Fotogramas del video del recorrido: afiches mientras carga y versión sin animación.
import parada1 from '../assets/recorrido/parada-1.jpg';
import parada2 from '../assets/recorrido/parada-2.jpg';
import parada3 from '../assets/recorrido/parada-3.jpg';
import parada4 from '../assets/recorrido/parada-4.jpg';
import parada5 from '../assets/recorrido/parada-5.jpg';
import parada6 from '../assets/recorrido/parada-6.jpg';

// Imágenes ilustrativas: no muestran el local ni el surtido exacto.
import catYerbas from '../assets/categorias/01-yerbas-infusiones.jpg';
import catLeches from '../assets/categorias/02-leches-vegetales.jpg';
import catYogures from '../assets/categorias/03-yogures.jpg';
import catFrutosSecos from '../assets/categorias/04-frutos-secos-semillas.jpg';
import catBarritas from '../assets/categorias/05-barritas-proteinas.jpg';
import catCongelados from '../assets/categorias/06-congelados.jpg';
import catPanificados from '../assets/categorias/07-panificados.jpg';
import catDulces from '../assets/categorias/08-dulces-untables.jpg';
import catChocolates from '../assets/categorias/09-chocolates-snacks.jpg';
import catOrganicos from '../assets/categorias/10-productos-organicos.jpg';
import catBolson from '../assets/categorias/11-bolson-verduras.jpg';
import mesaNatural from '../assets/carrusel/carrusel-01-mesa-natural.jpg';
import desayuno from '../assets/carrusel/carrusel-02-desayuno.jpg';
import huerta from '../assets/carrusel/carrusel-03-huerta.jpg';

// Portadas de las historias destacadas del Instagram del local.
import igSorteos from '../assets/instagram/sorteos.jpg';
import igRecetas from '../assets/instagram/recetas.jpg';
import igProductos from '../assets/instagram/productos.jpg';
import igOrganico from '../assets/instagram/organico.jpg';
import igVerduras from '../assets/instagram/verduras.jpg';

export { negocio, horarios, horariosResumen } from './negocio';

/** Video editado del recorrido (sin textos ni personas), servido desde public/. */
export const videoRecorrido = url('/video/recorrido.mp4');

export interface Parada {
  id: string;
  etiqueta: string;
  titulo: string;
  texto: string;
  foto: ImageMetadata;
  alt: string;
  /** Punto de la foto hacia el que hace zoom la cámara al pasar a la siguiente parada. */
  foco?: string;
  /** Tramo del video [inicio, fin] en segundos que se recorre con el scroll en esta parada. */
  video?: [number, number];
}

// El recorrido: la fachada en pantalla completa y, al bajar, la cámara entra por la
// puerta y camina por el local siguiendo el video.
export const recorrido: Parada[] = [
  {
    id: 'afuera',
    etiqueta: 'La vereda',
    titulo: 'Lo rico de elegir natural',
    texto: 'Comer mejor empieza cerca de casa. En Lola te ayudamos a encontrar lo que te hace bien, con la calidez de un almacén de barrio.',
    foto: fachada,
    alt: 'Fachada de El Almacén de Lola: cartel con el logo, vidriera iluminada con góndolas de madera y plantas en la entrada',
    // La puerta de vidrio del almacén (la de madera es del edificio).
    foco: '27% 64%',
  },
  {
    id: 'entrada',
    etiqueta: 'La entrada',
    titulo: 'Pasá, que te estábamos esperando',
    texto: 'Un almacén luminoso sobre la avenida, en pleno Victoria.',
    foto: parada1,
    alt: 'Vista desde la vereda hacia la entrada vidriada del almacén',
    video: [0, 4.2],
  },
  {
    id: 'gondolas',
    etiqueta: 'Góndolas',
    titulo: 'Góndolas de punta a punta',
    texto: 'Galletitas, harinas, snacks y todo lo de la despensa natural, ordenado para que encuentres rápido.',
    foto: parada2,
    alt: 'Estanterías de madera llenas de paquetes de galletitas, harinas y snacks',
    video: [4.2, 7.6],
  },
  {
    id: 'granel',
    etiqueta: 'Granel',
    titulo: 'Frutos secos para todos los gustos',
    texto: 'Frutos secos, semillas y mezclas fraccionadas, listas para llevar.',
    foto: parada3,
    alt: 'Centro del local con lámparas colgantes y mesas de frutos secos fraccionados',
    video: [7.6, 10.8],
  },
  {
    id: 'mostrador',
    etiqueta: 'El mostrador',
    titulo: 'Te ayudamos a elegir',
    texto: 'Si buscás algo puntual o no sabés por dónde empezar, preguntanos: nos encanta ayudarte.',
    foto: parada4,
    alt: 'Mostrador de madera con estantes de frascos y productos detrás',
    video: [10.8, 13.4],
  },
  {
    id: 'heladeras',
    etiqueta: 'Heladeras',
    titulo: 'Para resolver la semana',
    texto: 'Yogures, leches vegetales y congelados para resolver la semana.',
    foto: parada5,
    alt: 'Heladeras y freezers vidriados con productos refrigerados y congelados',
    video: [13.4, 18.6],
  },
  {
    id: 'despensa',
    etiqueta: 'Despensa',
    titulo: 'Y mucho más para descubrir',
    texto: 'Recorré las góndolas con tiempo: siempre hay algo rico para probar.',
    foto: parada6,
    alt: 'Estantes de madera con bolsas de frutos secos y legumbres a granel',
    video: [18.6, 21.85],
  },
];

export interface ParadaMovil {
  etiqueta: string;
  titulo: string;
  /** Una sola línea corta (12 palabras o menos). */
  linea: string;
  foto: ImageMetadata;
  alt: string;
  /** Encuadre de la foto en pantalla vertical (object-position). */
  encuadre: string;
  /** Hacia dónde se acerca el zoom lento. */
  foco: string;
  /** Zoom final del acercamiento lento. */
  zoom: number;
}

// Recorrido del celular: fotos reales en alta, una parada por deslizada (sin video).
// Heladeras queda dentro de Góndolas: en la foto del pasillo se ven a un costado.
export const recorridoMovil: ParadaMovil[] = [
  {
    etiqueta: 'La entrada',
    titulo: 'Pasá, que te estábamos esperando',
    linea: 'Un almacén luminoso sobre la avenida, en pleno Victoria.',
    foto: fachada,
    alt: 'Puerta de vidrio y vidriera iluminada de El Almacén de Lola',
    encuadre: '35% 50%',
    foco: '25% 65%',
    zoom: 1.2,
  },
  {
    etiqueta: 'Góndolas',
    titulo: 'Góndolas de punta a punta',
    linea: 'Despensa natural, heladeras y congelados para resolver la semana.',
    foto: pasillo,
    alt: 'Pasillo del almacén con góndolas de madera a ambos lados y heladeras',
    encuadre: '50% 50%',
    foco: '50% 55%',
    zoom: 1.08,
  },
  {
    etiqueta: 'Granel',
    titulo: 'Frutos secos para todos los gustos',
    linea: 'Frutos secos, semillas y mezclas fraccionadas, listas para llevar.',
    foto: granelLamparas,
    alt: 'Lámparas blancas colgantes sobre vitrinas de frutos secos y estantes de madera',
    encuadre: '50% 50%',
    foco: '50% 70%',
    zoom: 1.08,
  },
  {
    etiqueta: 'El mostrador',
    titulo: 'Te ayudamos a elegir',
    linea: 'Preguntanos lo que necesites: nos encanta ayudarte.',
    foto: mostrador,
    alt: 'Mesa de madera con frutos secos fraccionados frente al mostrador',
    encuadre: '65% 50%',
    foco: '60% 50%',
    zoom: 1.06,
  },
  {
    etiqueta: 'Despensa',
    titulo: 'Y mucho más para descubrir',
    linea: 'Recorré con tiempo: siempre hay algo rico para probar.',
    foto: exhibidores,
    alt: 'Exhibidores con yerbas, tés, barritas y snacks',
    encuadre: '100% 50%',
    foco: '80% 50%',
    zoom: 1.06,
  },
];

// Categorías mencionadas por el equipo del local (las marcadas `pendiente` no están confirmadas).
// Las fotos son ilustrativas: la grilla lo aclara al pie.
export const categorias = [
  { foto: catYerbas, nombre: 'Yerbas e infusiones', detalle: 'Mate, té y hierbas' },
  { foto: catLeches, nombre: 'Leches vegetales', detalle: 'Almendra, coco, avena y más' },
  { foto: catYogures, nombre: 'Yogures', detalle: 'Opciones vegetales y tradicionales' },
  { foto: catFrutosSecos, nombre: 'Frutos secos y semillas', detalle: 'Almendras, nueces, mezclas' },
  { foto: catBarritas, nombre: 'Barritas y proteínas', detalle: 'Para entrenar o para llevar' },
  { foto: catCongelados, nombre: 'Congelados', detalle: 'Listos para resolver la semana' },
  { foto: catPanificados, nombre: 'Panificados', detalle: 'Budines, panes y galletitas' },
  { foto: catDulces, nombre: 'Dulces y untables', detalle: 'Mermeladas, pastas de maní' },
  { foto: catChocolates, nombre: 'Chocolates y snacks', detalle: 'Para darte un gusto' },
  { foto: catOrganicos, nombre: 'Productos orgánicos', detalle: 'Te ayudamos a reconocerlos', pendiente: true },
  { foto: catBolson, nombre: 'Bolsón de verduras', detalle: 'Encargalo por Instagram', pendiente: true },
];

// Fotos reales del interior. `credito`: autora de la foto en Google Maps.
export const galeria: Array<{ foto: ImageMetadata; alt: string; texto: string; credito?: string }> = [
  {
    foto: mostrador,
    alt: 'Interior del almacén: mesa de madera con frutos secos fraccionados, lámparas colgantes y heladeras al fondo',
    texto: 'La mesa de granel',
    credito: 'Miriam Marto',
  },
  {
    foto: granelLamparas,
    alt: 'Lámparas blancas colgantes sobre vitrinas y estantes de madera',
    texto: 'Lámparas y madera',
    credito: 'Julia Marquez',
  },
  {
    foto: pasillo,
    alt: 'Pasillo del almacén con góndolas a ambos lados y piso de madera',
    texto: 'El pasillo',
    credito: 'Julia Marquez',
  },
  {
    foto: exhibidores,
    alt: 'Exhibidores con barritas, snacks y productos sin sellos',
    texto: 'Snacks para llevar',
    credito: 'Miriam Marto',
  },
];

// Historias destacadas reales de @lolasaludable: cada una abre esa historia en Instagram.
export const destacadas = [
  { nombre: 'Productos', foto: igProductos, url: 'https://www.instagram.com/stories/highlights/17882971570988914/' },
  { nombre: 'Recetas', foto: igRecetas, url: 'https://www.instagram.com/stories/highlights/17885580514854912/' },
  { nombre: '¿Es orgánico?', foto: igOrganico, url: 'https://www.instagram.com/stories/highlights/18118607608169522/' },
  { nombre: 'Bolsón', foto: igVerduras, url: 'https://www.instagram.com/stories/highlights/17865704171165712/' },
  { nombre: 'Sorteos', foto: igSorteos, url: 'https://www.instagram.com/stories/highlights/17905912606818650/' },
];

// Escenas ilustrativas para la franja "Del almacén a tu mesa".
export const carrusel = [
  { foto: mesaNatural, alt: 'Mesa de madera con frutos secos, pan de masa madre, frutos rojos y leche' },
  { foto: desayuno, alt: 'Desayuno con tostadas con mermelada, yogur con avena y leche' },
  { foto: huerta, alt: 'Verduras frescas de huerta sobre una mesa de madera' },
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
