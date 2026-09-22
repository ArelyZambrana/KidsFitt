import React, { useState } from 'react';

export default function CalorieTracker({ targetCalories }) {
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [foodItem, setFoodItem] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!caloriesInput) return;
    setConsumedCalories(prev => prev + Number(caloriesInput));
    setFoodItem('');
    setCaloriesInput('');
  };

  const remaining = targetCalories - consumedCalories;

  return (
    <div style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
      <h3>Seguimiento Calórico Diario</h3>
      <p>Consumidas: <strong>{consumedCalories} kcal</strong> / Meta: {targetCalories} kcal</p>
      <p style={{ color: remaining < 0 ? 'red' : 'green' }}>
        {remaining >= 0 ? `Restantes: ${remaining} kcal` : `¡Exceso de ${Math.abs(remaining)} kcal!`}
      </p>

      <form onSubmit={handleAddFood} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input 
          type="text" 
          placeholder="Ej: Jamón de beterraga" 
          value={foodItem} 
          onChange={(e) => setFoodItem(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Calorías (kcal)" 
          value={caloriesInput} 
          onChange={(e) => setCaloriesInput(e.target.value)} 
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}