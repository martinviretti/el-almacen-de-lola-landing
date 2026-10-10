// Datos del negocio sin imágenes: se pueden importar desde scripts del navegador.
// Lo marcado como pendiente hay que confirmarlo con la marca (ver PENDIENTES.md).

export const negocio = {
  nombre: 'El Almacén de Lola',
  tagline: 'Alimentos saludables',
  instagram: 'https://www.instagram.com/lolasaludable/',
  instagramUsuario: '@lolasaludable',
  seguidores: '1.747', // relevado el 10/10/2026
  direccion: 'Av. Presidente Perón 3099',
  localidad: 'Victoria, San Fernando',
  provincia: 'Buenos Aires',
  // Coordenadas aproximadas no verificadas: solo se usa la dirección en texto.
  mapsDestino: 'https://www.google.com/maps/dir/?api=1&destination=Av.+Presidente+Per%C3%B3n+3099,+Victoria,+Buenos+Aires',
  mapsEmbed: 'https://maps.google.com/maps?q=Av.%20Presidente%20Per%C3%B3n%203099%2C%20Victoria%2C%20Buenos%20Aires&z=16&output=embed',
};

// Día 0 = domingo. `null` = cerrado. Domingo cerrado: pendiente de confirmar.
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
