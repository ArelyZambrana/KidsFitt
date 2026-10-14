// Versión web del mapa de imágenes: usa las URLs que genera Vite.
const files = import.meta.glob('../assets/characters/*.{gif,png}', { eager: true, query: '?url', import: 'default' });
export const characterImages = Object.fromEntries(Object.entries(files).map(([p, url]) => [p.split('/').pop(), { uri: url }]));
