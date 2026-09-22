const syncWorkout = async (req, res) => {
  try {
    const { childId, pointsEarned, caloriesBurned } = req.body;

    if (!childId || pointsEarned === undefined) {
      return res.status(400).json({ success: false, error: 'Faltan datos de la sesión de ejercicio.' });
    }

    return res.status(200).json({
      success: true,
      message: '¡Rutina sincronizada con éxito!',
      summary: {
        pointsEarned,
        caloriesBurned: caloriesBurned || 45,
        timestamp: new Date()
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error al sincronizar rutina.' });
  }
};

module.exports = { syncWorkout };