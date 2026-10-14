import characters from './characters.json';

// Datos de mentira SOLO para ver el diseño. La app real los pide a la API (ver docs/UX.md).
export { characters };
export const child = { name: 'Mateo', points: 1250, unlockedCharacters: ['osos', 'richard', 'bob', 'skullette', 'gato', 'spike'], selectedCharacter: 'bob', settings: { stillCharacters: false, showKcal: true } };
export const routines = [
  { id: 'salta', name: 'Salta y estira', rounds: 4, minutes: 12, level: 2, levelName: 'Media', points: 120 },
  { id: 'despierta', name: 'Despierta tu cuerpo', rounds: 3, minutes: 8, level: 1, levelName: 'Suave', points: 80 },
  { id: 'baila', name: 'Baila y congela', rounds: 4, minutes: 10, level: 2, levelName: 'Media', points: 100 },
  { id: 'fuerza', name: 'Fuerza de héroe', rounds: 5, minutes: 15, level: 3, levelName: 'Alta', points: 160 },
];
export const exercise = { name: 'Saltos de tijera', hint: 'Abre y cierra brazos y piernas' };
export const result = { roundsDone: 4, rounds: 4, points: 135, bonusPoints: 15, minutes: 12, kcal: 23 };
