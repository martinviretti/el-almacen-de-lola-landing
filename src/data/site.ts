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

// Fotos del Instagram del almacén (publicaciones propias) para la galería.
import galMesaChocolates from '../assets/galeria/mesa-chocolates.jpg';
import galProductosExhibicion from '../assets/galeria/productos-exhibicion.jpg';
import galPublicacion04 from '../assets/galeria/publicacion-04.jpg';
import galPublicacion05 from '../assets/galeria/publicacion-05.jpg';
import galPublicacion06 from '../assets/galeria/publicacion-06.jpg';
import galPublicacion08 from '../assets/galeria/publicacion-08.jpg';
import galPublicacion09 from '../assets/galeria/publicacion-09.jpg';
import galPublicacion10 from '../assets/galeria/publicacion-10.jpg';
import galFachadaAcceso from '../assets/galeria/fachada-acceso.jpg';
// Cuadros del video del recorrido (474 × 632).
import galVideoGondola from '../assets/galeria/video-gondola-luz.jpg';
import galVideoPaquetes from '../assets/galeria/video-estantes-paquetes.jpg';
import galVideoLamparas from '../assets/galeria/video-lamparas-mesa.jpg';
import galVideoMostrador from '../assets/galeria/video-mostrador-estantes.jpg';
import galVideoGranel from '../assets/galeria/video-granel-estantes.jpg';
import galVideoCongelados from '../assets/galeria/video-congelados.jpg';
import galVideoPlanta from '../assets/galeria/video-estante-planta.jpg';

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

// Imágenes ilustrativas: no muestran el local ni el surtido exacto.
import catYerbas from '../assets/categorias/01-yerbas-infusiones.jpg';
import catLeches from '../assets/categorias/02-leches-vegetales.jpg';
import catYogures from '../assets/categorias/03-yogures.jpg';
import catFrutosSecos from '../assets/categorias/04-frutos-secos-semillas.jpg';
import catBarritas from '../assets/categorias/05-barritas-proteinas.jpg';
import catCongelados from '../assets/categorias/06-congelados.jpg';
import catChocolates from '../assets/categorias/09-chocolates-snacks.jpg';
import catOrganicos from '../assets/categorias/10-productos-organicos.jpg';
import mesaNatural from '../assets/carrusel/carrusel-01-mesa-natural.jpg';
import desayuno from '../assets/carrusel/carrusel-02-desayuno.jpg';

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

// Productos contados por momento del día (no por rubro): las fotos son ilustrativas,
// así que el sentido lo da el momento. `rubros` deja a la vista lo que hay de verdad.
// Las marcadas `pendiente` no están confirmadas (ver PENDIENTES.md).
export const momentos: Array<{
  foto: ImageMetadata;
  cuando: string;
  titulo: string;
  linea: string;
  rubros: string;
  pendiente?: boolean;
}> = [
  { foto: catYogures, cuando: 'Por la mañana', titulo: 'Un desayuno que arranca bien', linea: 'Yogures, panes y untables para empezar el día.', rubros: 'Yogures · Panificados · Untables' },
  { foto: catYerbas, cuando: 'A cualquier hora', titulo: 'Un mate, siempre', linea: 'Yerbas, hierbas y tés para la ronda de la tarde.', rubros: 'Yerbas · Infusiones' },
  { foto: catLeches, cuando: 'En el café', titulo: 'Con la leche que elijas', linea: 'Almendra, avena, coco y más, para el café o la licuada.', rubros: 'Leches vegetales' },
  { foto: catFrutosSecos, cuando: 'A media mañana', titulo: 'Algo rico para picar', linea: 'Frutos secos y semillas fraccionados: llevás lo que necesitás.', rubros: 'Frutos secos · Semillas · Mezclas' },
  { foto: catBarritas, cuando: 'Después de entrenar', titulo: 'Energía para seguir', linea: 'Barritas y proteínas que entran en cualquier mochila.', rubros: 'Barritas · Proteínas' },
  { foto: catChocolates, cuando: 'A las cinco', titulo: 'Un gustito', linea: 'Chocolates y snacks para el antojo de la tarde.', rubros: 'Chocolates · Snacks · Dulces' },
  { foto: catCongelados, cuando: 'A la noche', titulo: 'La cena, resuelta', linea: 'Congelados para esas noches sin ganas de cocinar.', rubros: 'Congelados' },
  { foto: catOrganicos, cuando: 'Cuando quieras', titulo: 'De la tierra, sin vueltas', linea: 'Productos orgánicos certificados. Te ayudamos a reconocerlos.', rubros: 'Orgánicos', pendiente: true },
];

// Fotos reales del local para la galería deslizable. `credito`: autora de la foto en
// Google Maps; las que no tienen crédito son del Instagram del propio almacén.
export const galeria: Array<{ foto: ImageMetadata; alt: string; credito?: string }> = [
  { foto: galMesaChocolates, alt: 'Mesa de madera con budines, chocolates orgánicos y frutos secos, con lámparas y heladeras al fondo' },
  { foto: galVideoGondola, alt: 'Góndola de madera llena de paquetes, con luz cálida y una planta arriba' },
  { foto: galPublicacion05, alt: 'Cajas de té en hebras sobre un estante de madera' },
  { foto: galVideoLamparas, alt: 'Lámparas colgantes sobre la mesa de granel y las góndolas del fondo' },
  { foto: galPublicacion04, alt: 'Pastas de maní y proteínas en frascos sobre un estante de madera' },
  { foto: pasillo, alt: 'Pasillo del almacén con góndolas a ambos lados y piso de madera', credito: 'Julia Marquez' },
  { foto: galVideoGranel, alt: 'Estantes con frutos secos y semillas fraccionados en bolsas' },
  { foto: galPublicacion09, alt: 'Budines y panificados envasados sobre la mesa del almacén' },
  { foto: galVideoMostrador, alt: 'Mostrador con estantes de suplementos, snacks y productos naturales' },
  { foto: galPublicacion08, alt: 'Estantes de madera con frascos de mermeladas y dulces' },
  { foto: galFachadaAcceso, alt: 'Entrada del almacén con revestimiento de madera y plantas en la vereda' },
  { foto: galVideoPaquetes, alt: 'Estantes con harinas, cereales y premezclas envasadas' },
  { foto: galPublicacion06, alt: 'Paquete de galletitas de chocolate sostenido frente a la mesa de granel' },
  { foto: granelLamparas, alt: 'Lámparas blancas colgantes sobre vitrinas y estantes de madera', credito: 'Julia Marquez' },
  { foto: galVideoCongelados, alt: 'Heladeras de congelados con puertas de vidrio' },
  { foto: galProductosExhibicion, alt: 'Exhibidor de madera con productos y carteles informativos' },
  { foto: galVideoPlanta, alt: 'Estante de madera con snacks y una planta al costado' },
  { foto: galPublicacion10, alt: 'Tabletas de chocolate con manteca de cacao en la góndola' },
  { foto: exhibidores, alt: 'Exhibidores con barritas, snacks y productos sin sellos', credito: 'Miriam Marto' },
];

// Escenas ilustrativas para la franja "Del almacén a tu mesa".
export const carrusel = [
  { foto: mesaNatural, alt: 'Mesa de madera con frutos secos, pan de masa madre, frutos rojos y leche' },
  { foto: desayuno, alt: 'Desayuno con tostadas con mermelada, yogur con avena y leche' },
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
