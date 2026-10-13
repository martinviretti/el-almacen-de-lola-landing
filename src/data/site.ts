// Todo el contenido de la landing vive acá. Los textos marcados con `pendiente`
// son propuestas que la marca tiene que confirmar antes de publicar (ver PENDIENTES.md).

import type { ImageMetadata } from 'astro';
import { url } from '../lib/url';

// Fotos reales del local (kit fotográfico del 12/10/2026, retoque de luz y color sin
// agregar ni quitar objetos). Las "-movil" son recortes 3:4. Pasillo, granel, mostrador y
// exhibidores salen de fotos que subieron clientas a Google Maps (ver `credito` y PENDIENTES.md).
// Portada: foto real del frente (la versión retocada con IA borraba la franja "DIETÉTICA").
import fachada from '../assets/fotos/02-fachada-real.webp';
import fotoPasillo from '../assets/fotos/04-pasillo.webp';
import fotoMostrador from '../assets/fotos/06-mostrador.webp';
import fotoVistaGeneral from '../assets/fotos/07-vista-general.webp';
import m02FachadaReal from '../assets/fotos/02-fachada-real-movil.webp';
import m03Entrada from '../assets/fotos/03-entrada-movil.webp';
import m04Pasillo from '../assets/fotos/04-pasillo-movil.webp';
import m05Granel from '../assets/fotos/05-granel-movil.webp';
import m06Mostrador from '../assets/fotos/06-mostrador-movil.webp';
import m07VistaGeneral from '../assets/fotos/07-vista-general-movil.webp';
import m08Despensa from '../assets/fotos/08-despensa-movil.webp';
import m09FrutosSecos from '../assets/fotos/09-frutos-secos-movil.webp';
import m10Infusiones from '../assets/fotos/10-infusiones-movil.webp';
import m11Especias from '../assets/fotos/11-especias-movil.webp';
import m12Exhibidores from '../assets/fotos/12-exhibidores-movil.webp';
import m13Heladeras from '../assets/fotos/13-heladeras-movil.webp';
import m14GranelEstantes from '../assets/fotos/14-granel-estantes-movil.webp';
import m15Aceites from '../assets/fotos/15-aceites-movil.webp';
import m16Snacks from '../assets/fotos/16-snacks-movil.webp';
// Fotos del celular del local (12/10/2026), sin retoque: heladera de yogures y freezer.
import fotoYogures from '../assets/fotos/momento-yogures.jpg';
import fotoCongelados from '../assets/fotos/momento-congelados.jpg';

// Logos de marcas (de los sitios oficiales de cada una).
import marcaNatier from '../assets/marcas/natier.png';
import marcaKapac from '../assets/marcas/kapac.png';
import marcaEntrenuts from '../assets/marcas/entrenuts.png';
import marcaSmams from '../assets/marcas/smams.png';
import marcaCachafaz from '../assets/marcas/cachafaz.png';
import marcaKraus from '../assets/marcas/kraus.png';
import marcaRoapipo from '../assets/marcas/roapipo.png';

// Fotogramas del video del recorrido: afiches mientras carga y versión sin animación.
import parada1 from '../assets/recorrido/parada-1.jpg';
import parada2 from '../assets/recorrido/parada-2.jpg';
import parada3 from '../assets/recorrido/parada-3.jpg';
import parada4 from '../assets/recorrido/parada-4.jpg';
import parada5 from '../assets/recorrido/parada-5.jpg';
import parada6 from '../assets/recorrido/parada-6.jpg';

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
    alt: 'Fachada de La Almacén de Lola: cartel con el logo, vidriera iluminada con góndolas de madera y plantas en la entrada',
    // La puerta de vidrio de la almacén (la de madera es del edificio).
    foco: '36% 72%',
  },
  {
    id: 'entrada',
    etiqueta: 'La entrada',
    titulo: 'Pasá, que te estábamos esperando',
    texto: 'Una almacén luminosa sobre la avenida, en pleno Victoria.',
    foto: parada1,
    alt: 'Vista desde la vereda hacia la entrada vidriada de la almacén',
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
    texto: 'Yogures, leches vegetales y congelados, siempre a mano en las heladeras.',
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
    linea: 'Una almacén luminosa sobre la avenida, en pleno Victoria.',
    foto: m03Entrada,
    alt: 'Vidriera de La Almacén de Lola con el logo, un banco de madera y plantas en la entrada',
    encuadre: '50% 50%',
    foco: '45% 60%',
    zoom: 1.06,
  },
  {
    etiqueta: 'Góndolas',
    titulo: 'Góndolas de punta a punta',
    linea: 'Despensa natural, heladeras y congelados para resolver la semana.',
    foto: fotoPasillo,
    alt: 'Pasillo de la almacén con góndolas de madera a ambos lados y heladeras',
    encuadre: '50% 50%',
    foco: '50% 55%',
    zoom: 1.08,
  },
  {
    etiqueta: 'Granel',
    titulo: 'Frutos secos para todos los gustos',
    linea: 'Frutos secos, semillas y mezclas fraccionadas, listas para llevar.',
    foto: m09FrutosSecos,
    alt: 'Mesa con potes de frutos secos, mezclas y budines fraccionados en el local',
    encuadre: '50% 50%',
    foco: '50% 45%',
    zoom: 1.08,
  },
  {
    etiqueta: 'El mostrador',
    titulo: 'Te ayudamos a elegir',
    linea: 'Preguntanos lo que necesites: nos encanta ayudarte.',
    foto: fotoMostrador,
    alt: 'Mesa de madera con budines, chocolates y frutos secos frente al mostrador',
    encuadre: '55% 50%',
    foco: '60% 50%',
    zoom: 1.06,
  },
  {
    etiqueta: 'Despensa',
    titulo: 'Y mucho más para descubrir',
    linea: 'Recorré con tiempo: siempre hay algo rico para probar.',
    foto: fotoVistaGeneral,
    alt: 'Vista del interior con estanterías de madera, granel y golosinas a la vista',
    encuadre: '50% 50%',
    foco: '55% 60%',
    zoom: 1.06,
  },
];

// Productos contados por momento del día (no por rubro), con fotos reales del local.
// `rubros` deja a la vista lo que hay de verdad.
export const momentos: Array<{
  foto: ImageMetadata;
  cuando: string;
  titulo: string;
  linea: string;
  rubros: string;
}> = [
  { foto: fotoYogures, cuando: 'Por la mañana', titulo: 'Un desayuno que arranca bien', linea: 'Yogures, leches vegetales y untables para empezar el día.', rubros: 'Yogures · Leches vegetales · Untables' },
  { foto: m10Infusiones, cuando: 'A cualquier hora', titulo: 'Un mate, siempre', linea: 'Yerbas, hierbas y tés para la ronda de la tarde.', rubros: 'Yerbas · Infusiones' },
  { foto: m13Heladeras, cuando: 'Para refrescarte', titulo: 'Algo fresco para tomar', linea: 'Kéfir, jugos exprimidos y bebidas frías en la heladera.', rubros: 'Kéfir · Jugos · Bebidas' },
  { foto: m14GranelEstantes, cuando: 'A media mañana', titulo: 'Algo rico para picar', linea: 'Frutos secos y semillas fraccionados: llevás lo que necesitás.', rubros: 'Frutos secos · Semillas · Mezclas' },
  { foto: m12Exhibidores, cuando: 'Después de entrenar', titulo: 'Energía para seguir', linea: 'Barritas y proteínas que entran en cualquier mochila.', rubros: 'Barritas · Proteínas' },
  { foto: m16Snacks, cuando: 'A las cinco', titulo: 'Un gustito', linea: 'Chocolates, golosinas y snacks para el antojo de la tarde.', rubros: 'Chocolates · Snacks · Dulces' },
  { foto: fotoCongelados, cuando: 'A la noche', titulo: 'La cena, resuelta', linea: 'Hamburguesas vegetales, tartas y congelados para las noches sin ganas de cocinar.', rubros: 'Congelados' },
  { foto: m15Aceites, cuando: 'Al cocinar', titulo: 'Para cocinar rico', linea: 'Aceites, especias, harinas y legumbres para la cocina de todos los días.', rubros: 'Aceites · Especias · Harinas · Legumbres' },
];

// Galería deslizable: fotos reales del local en 3:4. `credito`: autora de la foto original
// en Google Maps (hay que pedirle permiso; ver PENDIENTES.md).
export const galeria: Array<{ foto: ImageMetadata; alt: string; credito?: string }> = [
  { foto: m03Entrada, alt: 'Vidriera con el logo de Lola, un banco de madera y plantas en la entrada' },
  { foto: m09FrutosSecos, alt: 'Potes de frutos secos y mezclas sobre la mesa, con budines adelante' },
  { foto: m04Pasillo, alt: 'Pasillo con góndolas de madera, heladeras y lámparas colgantes', credito: 'Julia Marquez' },
  { foto: m10Infusiones, alt: 'Estantes con yerbas, tés en caja e infusiones' },
  { foto: m05Granel, alt: 'Rincón del granel con frascos, balanza y un ramo de flores', credito: 'Julia Marquez' },
  { foto: m11Especias, alt: 'Frascos de especias y semillas en estantes de madera clara' },
  { foto: m06Mostrador, alt: 'Mesa central con budines, chocolates y frutos secos', credito: 'Miriam Marto' },
  { foto: m15Aceites, alt: 'Botellas de aceite de oliva y aceites saludables en la góndola' },
  { foto: m07VistaGeneral, alt: 'Interior con estanterías de madera, granel y golosinas a la vista' },
  { foto: m12Exhibidores, alt: 'Exhibidor de barritas y snacks sin sellos', credito: 'Miriam Marto' },
  { foto: m14GranelEstantes, alt: 'Estantes con frascos de granos, semillas y legumbres' },
  { foto: m13Heladeras, alt: 'Heladera con quesos, untables y productos refrigerados' },
  { foto: m08Despensa, alt: 'Estanterías con harinas, azúcares y productos fraccionados' },
  { foto: m16Snacks, alt: 'Snacks, mezclas y golosinas en exhibidores transparentes' },
  { foto: m02FachadaReal, alt: 'Frente de la almacén con el cartel de Lola y la vidriera' },
];

// Sellos que el cliente busca en el envase. Son íconos propios, no los logos oficiales:
// el logo "Sin TACC" de ANMAT solo puede ir en productos certificados.
export const sellos = [
  { icono: 'grains-slash', nombre: 'Sin TACC', detalle: 'Envasados con logo oficial' },
  { icono: 'plant', nombre: 'Vegano', detalle: '100% vegetal' },
  { icono: 'seal-check', nombre: 'Orgánico', detalle: 'Con certificación' },
  { icono: 'drop-slash', nombre: 'Sin lactosa', detalle: 'Leches y yogures' },
  { icono: 'cube', nombre: 'Sin azúcar agregada', detalle: 'Para cuidarte sin resignar' },
  { icono: 'grains', nombre: 'Integral', detalle: 'Harinas, panes y cereales' },
];

// Marcas con su logo oficial (bajado del sitio de cada marca). PENDIENTE: confirmar con
// la encargada cuáles trabaja el local; Entrenuts aparece en las fotos del propio local.
// Para sumar una: guardá el logo (PNG con fondo transparente) en src/assets/marcas/.
export const marcas: Array<{ nombre: string; logo: ImageMetadata }> = [
  { nombre: 'Natier', logo: marcaNatier },
  { nombre: 'Kapac', logo: marcaKapac },
  { nombre: 'Entrenuts', logo: marcaEntrenuts },
  { nombre: 'Smams', logo: marcaSmams },
  { nombre: 'Cachafaz', logo: marcaCachafaz },
  { nombre: 'Kraus', logo: marcaKraus },
  { nombre: 'Roapipó', logo: marcaRoapipo },
];

// Opiniones destacadas de Google para "Visitanos" (se muestran hasta 4). PENDIENTE: cargarlas
// con el texto TAL CUAL está en Google y solo el nombre y la inicial del apellido de quien la
// escribió. No inventar ni retocar opiniones. Si queda vacío, se ve solo la calificación.
export const resenas: Array<{ texto: string; autor: string; estrellas?: 1 | 2 | 3 | 4 | 5 }> = [
  // Copiadas de la ficha de Google el 12/10/2026 (texto tal cual; solo se unieron saltos de
  // línea y espacios dobles). Las estrellas de cada una no vinieron en el copiado: no se muestran.
  {
    texto: 'Un lugar hermoso, con muy buenos productos y una atención impecable. La amabilidad y la buena onda con la que atienden hacen que uno siempre quiera volver. ¡Gracias por el trato de siempre!',
    autor: 'Candela G.',
  },
  {
    texto: 'Un lugar que te sorprende cada vez que voy encuentro nuevos productos, todo muy ordenado muy variado en opciones sin duda encuentro todo lo que busco, las chicas super encantadoras se toman el tiempo para asesorarme',
    autor: 'Julia M.',
  },
  { texto: 'Productos de Calidad. Muy limpio el local. ¡Atienden con buena onda y ganas!', autor: 'Naty D.' },
  {
    texto: 'Tienen de todo! Muy surtido en serio!! Todo prolijamente ordenado, con su precio, limpio. Realmente da gusto entrar y mirar todo tranquilo para poder elegir.',
    autor: 'Paula B.',
  },
  {
    texto: 'Unas genias las chicas por su cordialidad y buena onda. Te asesoran y aconsejan sobre los productos y tienen de todo. Son lo mas',
    autor: 'Gabriela B.',
  },
  {
    texto: 'Excelente tienda de alimentos y muy buena atención. Voy desde que abrieron y siempre me atendieron muy bien!!!',
    autor: 'María P.',
  },
];

export const tagline =
  'Comer mejor no tendría que ser complicado. Por eso juntamos lo rico y lo natural en un solo lugar, cerca de casa.';

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
