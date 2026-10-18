// Todo el contenido de la landing vive acá. Los textos marcados con `pendiente`
// son propuestas que la marca tiene que confirmar antes de publicar (ver PENDIENTES.md).

import type { ImageMetadata } from 'astro';
import { url } from '../lib/url';

// Solo fotos propias del local: kit fotográfico del 12/10/2026 (retoque de luz y color, sin
// agregar ni quitar objetos), fotos del celular del local y publicaciones del Instagram de Lola.
// Afuera a propósito: las 4 que salen de fotos de clientas en Google Maps (pasillo, granel,
// mostrador y exhibidores) y la fachada retocada con IA. Están en ../fotos-lola por si hay permiso.
import entrada from '../assets/fotos/03-entrada.webp';
import entradaMovil from '../assets/fotos/03-entrada-movil.webp';
import fachada from '../assets/fotos/02-fachada-real.webp';
import vistaGeneral from '../assets/fotos/07-vista-general.webp';
import despensa from '../assets/fotos/08-despensa.webp';
import frutosSecos from '../assets/fotos/09-frutos-secos.webp';
import frutosSecosMovil from '../assets/fotos/09-frutos-secos-movil.webp';
import infusiones from '../assets/fotos/10-infusiones.webp';
import especias from '../assets/fotos/11-especias-movil.webp';
import granelEstantes from '../assets/fotos/14-granel-estantes.webp';
import aceites from '../assets/fotos/15-aceites-movil.webp';
import snacks from '../assets/fotos/16-snacks.webp';
import yogures from '../assets/fotos/momento-yogures.jpg';
import congelados from '../assets/fotos/momento-congelados.jpg';
import pastaDeMani from '../assets/fotos/ig-pasta-de-mani.jpg';
import posterRecorrido from '../assets/recorrido/parada-1.jpg';

export { negocio, horarios, horariosResumen } from './negocio';

export const fotos = { entrada, entradaMovil, fachada, frutosSecosMovil, posterRecorrido };

/** Video editado del recorrido (sin textos ni personas), servido desde public/. */
export const videoRecorrido = url('/video/recorrido.mp4');

// ---------- Qué vas a encontrar ----------
// Grilla despareja: `forma` decide cuánto ocupa cada foto en escritorio (4 columnas).
// En el celular van de a dos, y las `ancha` ocupan la fila entera.
export interface Categoria {
  nombre: string;
  linea: string;
  foto: ImageMetadata;
  alt: string;
  forma: 'grande' | 'alta' | 'ancha' | 'chica';
  /** Encuadre de la foto (object-position). */
  encuadre?: string;
}

export const categorias: Categoria[] = [
  {
    nombre: 'Frutos secos y mezclas',
    linea: 'Fraccionados en el local: llevás poquito para probar o lo de toda la semana.',
    foto: frutosSecos,
    alt: 'Mesa con potes de frutos secos, mezclas y budines fraccionados en el local',
    forma: 'grande',
  },
  {
    nombre: 'Yerbas, tés e infusiones',
    linea: 'Para el mate de todos los días y el té de la noche.',
    foto: infusiones,
    alt: 'Estantes con yerbas, tés en caja e infusiones',
    forma: 'chica',
  },
  {
    nombre: 'Especias y semillas',
    linea: 'En frascos, para darle sabor a la cocina de siempre.',
    foto: especias,
    alt: 'Frascos de especias y semillas en estantes de madera clara',
    forma: 'alta',
  },
  {
    nombre: 'Aceites',
    linea: 'De oliva y otros, para cocinar y para aderezar.',
    foto: aceites,
    alt: 'Botellas de aceite de oliva en la góndola',
    forma: 'chica',
    encuadre: '50% 40%',
  },
  {
    nombre: 'Lo de la heladera',
    linea: 'Yogures, leches vegetales y untables para el desayuno y la merienda.',
    foto: yogures,
    alt: 'Heladera vidriada con yogures, leches vegetales y untables',
    forma: 'alta',
  },
  {
    nombre: 'Snacks y golosinas',
    linea: 'Algo rico para picar a la tarde.',
    foto: snacks,
    alt: 'Snacks, mezclas y golosinas en exhibidores transparentes',
    forma: 'ancha',
  },
  {
    nombre: 'Congelados',
    linea: 'Hamburguesas vegetales y más, para las noches sin ganas de cocinar.',
    foto: congelados,
    alt: 'Freezer con hamburguesas vegetales, tartas y otros congelados',
    forma: 'ancha',
    encuadre: '50% 35%',
  },
  {
    nombre: 'Untables',
    linea: 'Pastas de maní y más, para el pan de todos los días.',
    foto: pastaDeMani,
    alt: 'Frascos de pasta de maní de Entrenuts en la góndola',
    forma: 'alta',
  },
];

// ---------- Por qué Lola ----------
export const tagline =
  'Comer mejor no tendría que ser complicado. Por eso juntamos lo rico y lo natural en un solo lugar, cerca de casa.';

// Sellos que el cliente busca en el envase. Son íconos propios, no los logos oficiales:
// el logo "Sin TACC" de ANMAT solo puede ir en productos certificados.
export const sellos = [
  { icono: 'grains-slash', nombre: 'Sin TACC' },
  { icono: 'plant', nombre: 'Vegano' },
  { icono: 'seal-check', nombre: 'Orgánico' },
  { icono: 'drop-slash', nombre: 'Sin lactosa' },
  { icono: 'cube', nombre: 'Sin azúcar agregada' },
  { icono: 'grains', nombre: 'Integral' },
];

export interface Razon {
  rotulo: string;
  titulo: string;
  texto: string;
  foto: ImageMetadata;
  alt: string;
  /** Opinión real de Google que lo respalda (tal cual está en Google). */
  cita?: { texto: string; autor: string };
  sellos?: boolean;
}

export const razones: Razon[] = [
  {
    rotulo: 'Atención',
    titulo: 'Te ayudamos a *elegir*',
    texto: 'Si buscás algo puntual o no sabés por dónde empezar, preguntanos. Te contamos qué es cada cosa, para qué la busca la gente y cuál conviene para lo que necesitás.',
    foto: vistaGeneral,
    alt: 'Interior de la almacén: estanterías de madera, mesa de granel y lámparas colgantes',
    cita: { texto: 'Las chicas super encantadoras se toman el tiempo para asesorarme', autor: 'Julia M.' },
  },
  {
    rotulo: 'Granel',
    titulo: 'Comprás *suelto*, lo que necesitás',
    texto: 'Frutos secos, semillas, legumbres y especias fraccionados en el local. Sin paquetes de más: llevás la cantidad justa y probás cosas nuevas sin gastar de más.',
    foto: granelEstantes,
    alt: 'Estantes con frascos de granos, semillas y legumbres fraccionados',
  },
  {
    rotulo: 'Etiquetas',
    titulo: 'Lo que buscás, *bien señalizado*',
    texto: 'Te mostramos las opciones según lo que necesites. Para personas celíacas, solo recomendamos lo envasado con el logo oficial "Sin TACC": lo fraccionado puede tener contacto con harinas.',
    foto: despensa,
    alt: 'Estanterías con harinas, azúcares y productos envasados',
    sellos: true,
  },
];

// ---------- El recorrido ----------
// Paradas del video (tramos en segundos). Mientras corre el video se marca la parada actual.
export const paradas: Array<{ etiqueta: string; titulo: string; desde: number }> = [
  { etiqueta: 'La entrada', titulo: 'Pasá, que te estábamos esperando', desde: 0 },
  { etiqueta: 'Góndolas', titulo: 'Despensa natural de punta a punta', desde: 4.2 },
  { etiqueta: 'Granel', titulo: 'Frutos secos para todos los gustos', desde: 7.6 },
  { etiqueta: 'El mostrador', titulo: 'Te ayudamos a elegir', desde: 10.8 },
  { etiqueta: 'Heladeras', titulo: 'Yogures, leches vegetales y congelados', desde: 13.4 },
  { etiqueta: 'Despensa', titulo: 'Y mucho más para descubrir', desde: 18.6 },
];

// ---------- Opiniones de Google ----------
// Texto TAL CUAL está en Google, solo con el nombre y la inicial del apellido. No inventar ni retocar.
// Copiadas de la ficha el 12/10/2026 (solo se unieron saltos de línea y espacios dobles).
export const resenas: Array<{ texto: string; autor: string }> = [
  {
    texto: 'Un lugar hermoso, con muy buenos productos y una atención impecable. La amabilidad y la buena onda con la que atienden hacen que uno siempre quiera volver. ¡Gracias por el trato de siempre!',
    autor: 'Candela G.',
  },
  {
    texto: 'Tienen de todo! Muy surtido en serio!! Todo prolijamente ordenado, con su precio, limpio. Realmente da gusto entrar y mirar todo tranquilo para poder elegir.',
    autor: 'Paula B.',
  },
  {
    texto: 'Un lugar que te sorprende cada vez que voy encuentro nuevos productos, todo muy ordenado muy variado en opciones sin duda encuentro todo lo que busco, las chicas super encantadoras se toman el tiempo para asesorarme',
    autor: 'Julia M.',
  },
  { texto: 'Productos de Calidad. Muy limpio el local. ¡Atienden con buena onda y ganas!', autor: 'Naty D.' },
  {
    texto: 'Unas genias las chicas por su cordialidad y buena onda. Te asesoran y aconsejan sobre los productos y tienen de todo. Son lo mas',
    autor: 'Gabriela B.',
  },
  {
    texto: 'Excelente tienda de alimentos y muy buena atención. Voy desde que abrieron y siempre me atendieron muy bien!!!',
    autor: 'María P.',
  },
];

// ---------- Preguntas frecuentes ----------
export const preguntas = [
  {
    p: '¿Dónde queda la almacén?',
    r: 'Estamos en Av. Presidente Perón 3099, en Victoria, partido de San Fernando. Tocá "Cómo llegar" y Google Maps te arma el recorrido.',
  },
  {
    p: '¿Qué horarios tienen?',
    r: 'De lunes a viernes de 8 a 20 h y los sábados de 9 a 20 h. Los domingos la almacén está cerrada.',
  },
  {
    p: '¿Qué medios de pago aceptan?',
    r: 'Efectivo, tarjeta y Mercado Pago. Si pagás en efectivo, tenés descuento.',
  },
  {
    p: '¿Puedo consultar precios o si tienen un producto antes de ir?',
    r: 'Sí. Escribinos por mensaje directo en Instagram a @lolasaludable y te respondemos.',
    pendiente: true,
  },
  {
    p: '¿Tienen productos sin TACC?',
    // Criterio: solo se asegura lo envasado con logo oficial. Lo fraccionado en el local
    // puede tener contacto cruzado con harinas y no se recomienda a personas celíacas.
    r: 'Sí. Tenemos productos envasados con el logo oficial "Sin TACC". Los que fraccionamos en el local no los recomendamos para personas celíacas, porque pueden tener contacto con harinas. Si tenés dudas, preguntanos y te mostramos las opciones.',
  },
  {
    p: '¿Venden productos orgánicos?',
    r: 'Sí. En la historia destacada "¿Es orgánico?" de nuestro Instagram te contamos cómo reconocer un producto orgánico certificado.',
    pendiente: true,
  },
];
