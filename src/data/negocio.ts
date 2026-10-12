// Datos del negocio sin imágenes: se pueden importar desde scripts del navegador.
// Lo marcado como pendiente hay que confirmarlo con la marca (ver PENDIENTES.md).

const GOOGLE_PLACE_ID = 'ChIJn3Y_lXGvvJURWcWfWPucoqs';

export const negocio = {
  nombre: 'El Almacén de Lola',
  tagline: 'Alimentos saludables',
  instagram: 'https://www.instagram.com/lolasaludable/',
  instagramUsuario: '@lolasaludable',
  // PENDIENTE: número de WhatsApp con código de país, sin + ni espacios (ej. 5491112345678).
  // Vacío: el botón abre WhatsApp con el mensaje listo para elegir el chat.
  whatsapp: '',
  whatsappMensaje: 'Hola Lola, quería hacerles una consulta.',
  // Redondeado hacia abajo para que no quede viejo enseguida (eran 1.747 el 10/10/2026).
  seguidores: 'Más de 1.700',
  direccion: 'Av. Presidente Perón 3099',
  localidad: 'Victoria, San Fernando',
  provincia: 'Buenos Aires',
  codigoPostal: 'B1644',
  // Ficha de Google Maps del local (Place ID y pin verificados abriendo la ficha el 12/10/2026).
  googlePlaceId: GOOGLE_PLACE_ID,
  geo: { lat: -34.4526938, lng: -58.5393703 },
  googleFicha: `https://www.google.com/maps/search/?api=1&query=El%20Almac%C3%A9n%20de%20Lola&query_place_id=${GOOGLE_PLACE_ID}`,
  // Abre el formulario de opinión de Google (pide iniciar sesión).
  googleOpinar: `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`,
  // Calificación que muestra la ficha. Actualizarla cada tanto (4,3 el 12/10/2026).
  googleCalificacion: '4,3',
  // Medios de pago confirmados por Martín (12/10/2026). El % de descuento en efectivo no se publica.
  pagos: ['Efectivo, con descuento', 'Tarjeta', 'Mercado Pago'],
  mapsDestino: `https://www.google.com/maps/dir/?api=1&destination=El%20Almac%C3%A9n%20de%20Lola&destination_place_id=${GOOGLE_PLACE_ID}`,
  mapsEmbed: 'https://maps.google.com/maps?q=El%20Almacen%20de%20LOLA%2C%20Av.%20Pres.%20Per%C3%B3n%203099%2C%20Victoria&z=17&output=embed',
};

// Día 0 = domingo. `null` = cerrado. Domingos cerrado: confirmado (11/10/2026).
export const horarios: Array<{ dia: string; abre: number | null; cierra: number | null }> = [
  { dia: 'Domingo', abre: null, cierra: null },
  { dia: 'Lunes', abre: 8, cierra: 20 },
  { dia: 'Martes', abre: 8, cierra: 20 },
  { dia: 'Miércoles', abre: 8, cierra: 20 },
  { dia: 'Jueves', abre: 8, cierra: 20 },
  { dia: 'Viernes', abre: 8, cierra: 20 },
  { dia: 'Sábado', abre: 9, cierra: 20 },
];

export const horariosResumen = [
  { dias: 'Lunes a viernes', horas: '8 a 20 h' },
  { dias: 'Sábados', horas: '9 a 20 h' },
  { dias: 'Domingos', horas: 'Cerrado' },
];
