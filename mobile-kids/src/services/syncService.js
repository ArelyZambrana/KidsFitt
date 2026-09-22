// Servicio para enviar el progreso del niño al backend
export const syncWorkoutData = async (childId, pointsEarned, caloriesBurned) => {
  try {
    const response = await fetch('http://TU_IP_LOCAL:5000/api/workout/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        childId,
        pointsEarned,
        caloriesBurned,
        date: new Date().toISOString(),
      }),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al sincronizar datos:', error);
    return { success: false };
  }
};