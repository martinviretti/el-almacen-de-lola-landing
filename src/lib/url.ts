// Antepone la ruta base del sitio (en GitHub Pages: /el-almacen-de-lola-landing).
// Usar para todo lo que apunte a public/ o a otra página: url('/og.jpg'), url('/').
export const url = (ruta: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${ruta.replace(/^\//, '')}`;
