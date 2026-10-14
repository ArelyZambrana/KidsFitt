// Vista previa en el NAVEGADOR (sin Expo ni celular): renderiza los mismos componentes de src/ui con react-native-web.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

export default defineConfig({
  plugins: [
    react({ include: /\.(jsx|js)$/ }),
    { // en el navegador no existe require(): las imágenes se resuelven con una versión web de characterImages
      name: 'character-images-web',
      enforce: 'pre',
      resolveId(source, importer) {
        if (source.endsWith('/characterImages') && importer && importer.replace(/\\/g, '/').includes('/src/ui/')) return path.join(here, 'characterImages.web.js');
        return null;
      },
    },
  ],
  resolve: {
    // Los archivos de ../src no están dentro de preview/, así que fijamos de dónde salen las librerías (y una sola copia de React).
    alias: [
      { find: /^react-native$/, replacement: path.join(here, 'node_modules/react-native-web') },
      { find: /^react-native-web$/, replacement: path.join(here, 'node_modules/react-native-web') },
      { find: /^react$/, replacement: path.join(here, 'node_modules/react') },
      { find: /^react\/jsx-runtime$/, replacement: path.join(here, 'node_modules/react/jsx-runtime.js') },
      { find: /^react\/jsx-dev-runtime$/, replacement: path.join(here, 'node_modules/react/jsx-dev-runtime.js') },
      { find: /^react-dom$/, replacement: path.join(here, 'node_modules/react-dom') },
      { find: /^react-dom\/client$/, replacement: path.join(here, 'node_modules/react-dom/client.js') },
    ],
    extensions: ['.web.js', '.js', '.jsx', '.json'],
  },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$|preview\/.*\.jsx?$/, exclude: [] },
  server: { port: 5174, fs: { allow: [path.join(here, '..')] } },
});
