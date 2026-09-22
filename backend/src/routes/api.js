const express = require('express');
const router = express.Router();

// 1. Ruta para cálculo nutricional (Módulo 1)
router.post('/nutrition/calculate', (req, res) => {
  const { weightKg, heightCm, gender } = req.body;
  const bmi = (weightKg / Math.pow(heightCm / 100, 2)).toFixed(1);
  const targetCalories = Math.round((17.5 * weightKg + 651) * 1.375 * 0.82);
  const targetProteinGrams = Math.round(weightKg * 1.3);

  return res.status(200).json({
    success: true,
    data: { bmi, targetCalories, targetProteinGrams }
  });
});

// 2. Ruta para obtener recetas (Módulo 1)
router.get('/recipes', (req, res) => {
  const sampleRecipes = [
    {
      id: "1",
      title: "Jamón Saludable de Beterraga",
      description: "Fiambre casero alto en proteína y bajo en grasa.",
      calories: 120,
      proteinGrams: 18,
      ingredients: ["500g Pechuga de pavo", "1/2 Beterraga cocida", "Especias al gusto"],
      instructions: ["Procesar la carne con la beterraga.", "Moldear y hornear por 45 min."]
    }
  ];
  return res.status(200).json({ success: true, data: sampleRecipes });
});

// 3. Ruta para sincronizar ejercicio desde la App Móvil (Módulo 3)
router.post('/workout/sync', (req, res) => {
  const { childId, pointsEarned, caloriesBurned } = req.body;

  return res.status(200).json({
    success: true,
    message: '¡Rutina sincronizada con éxito!',
    summary: {
      pointsEarned: pointsEarned || 0,
      caloriesBurned: caloriesBurned || 45,
      timestamp: new Date()
    }
  });
});

module.exports = router;