/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // CAMBIO IMPORTANTE: Usamos el nuevo paquete aquí
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;