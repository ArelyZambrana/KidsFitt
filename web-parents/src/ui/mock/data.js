// Datos de mentira SOLO para ver el diseño. En la app real vienen de la API (ver docs/UX.md).
export const child = { name: 'Mateo', points: 1250 };
export const weekly = { goalMinutes: 420, minutes: 273, points: 710, kcal: 94, days: [24, 42, 0, 30, 36, 45, 0].map((m) => ({ minutes: m })) };
export const lastMeasurement = { bmi: 15.9, z: -0.32, category: 'normal' };
export const measurements = [
  { id: 1, date: '02/04/2026', weightKg: 24.6, heightCm: 125.0, bmi: 15.7, z: -0.4, category: 'normal' },
  { id: 2, date: '02/07/2026', weightKg: 25.2, heightCm: 126.5, bmi: 15.7, z: -0.4, category: 'normal' },
  { id: 3, date: '02/10/2026', weightKg: 26.0, heightCm: 128.0, bmi: 15.9, z: -0.3, category: 'normal' },
];
export const sessions = [
  { id: 1, date: '12/10/2026', routine: 'Salta y estira', rounds: 4, minutes: 12, points: 135, kcal: 23 },
  { id: 2, date: '11/10/2026', routine: 'Baila y congela', rounds: 4, minutes: 10, points: 100, kcal: 19 },
  { id: 3, date: '09/10/2026', routine: 'Fuerza de héroe', rounds: 3, minutes: 9, points: 96, kcal: 24 },
];
export const recipes = [
  { id: 1, title: 'Brochetas arcoíris de fruta', category: 'merienda', calories: 120, proteinGrams: 3, description: 'Fruta de colores en palito con yogur para mojar.', ingredients: ['Frutilla', 'Mandarina', 'Uva', 'Yogur natural'], instructions: ['Lava y corta la fruta.', 'Ensarta por colores.', 'Sirve con yogur.'] },
  { id: 2, title: 'Carita feliz de huevo', category: 'desayuno', calories: 210, proteinGrams: 13, description: 'Huevo revuelto con ojos de tomate.', ingredients: ['2 huevos', 'Tomate cherry', 'Pan integral'], instructions: ['Revuelve los huevos.', 'Sirve sobre el pan.', 'Decora la cara.'] },
];
