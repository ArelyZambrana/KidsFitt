import React, { useState } from 'react';
import CalorieTracker from './components/CalorieTracker';

export default function App() {
  const [formData, setFormData] = useState({ age: 10, gender: 'male', weightKg: 45, heightCm: 135 });
  const [plan, setPlan] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const heightM = formData.heightCm / 100;
    const bmi = (formData.weightKg / (heightM * heightM)).toFixed(1);
    const bmr = formData.gender === 'male' ? (17.5 * formData.weightKg + 651) : (12.2 * formData.weightKg + 746);
    const targetCalories = Math.round(bmr * 1.375 * 0.82);
    const targetProteinGrams = Math.round(formData.weightKg * 1.3);

    setPlan({ bmi, targetCalories, targetProteinGrams });
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', padding: '30px', maxWidth: '900px', margin: '0 auto', color: '#333' }}>
      <header style={{ textBaseline: 'center', textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#FF5722', fontSize: '2.5rem', margin: 0 }}>KidsFit 🥗</h1>
        <p style={{ color: '#666' }}>Plataforma de Control Nutricional y Seguimiento Infantil</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Formulario y Métricas */}
        <section style={{ background: '#F9F9F9', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#2196F3' }}>1. Perfil del Niño/a</h2>
          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label>Edad: <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: Number(e.target.value)})} style={inputStyle} /></label>
            <label>Peso (kg): <input type="number" value={formData.weightKg} onChange={e => setFormData({...formData, weightKg: Number(e.target.value)})} style={inputStyle} /></label>
            <label>Estatura (cm): <input type="number" value={formData.heightCm} onChange={e => setFormData({...formData, heightCm: Number(e.target.value)})} style={inputStyle} /></label>
            <button type="submit" style={btnStyle}>Calcular Plan Nutricional</button>
          </form>

          {plan && (
            <div style={{ marginTop: '20px', background: '#E8F5E9', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #4CAF50' }}>
              <p style={{ margin: '4px 0' }}><strong>IMC Actual:</strong> {plan.bmi}</p>
              <p style={{ margin: '4px 0' }}><strong>Meta Calórica:</strong> {plan.targetCalories} kcal/día</p>
              <p style={{ margin: '4px 0' }}><strong>Meta Proteica:</strong> {plan.targetProteinGrams} g/día</p>
            </div>
          )}
        </section>

        {/* Tracker y Recetas */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {plan ? (
            <CalorieTracker targetCalories={plan.targetCalories} />
          ) : (
            <div style={{ background: '#FFF3E0', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
              <p>Calcula el plan nutricional para habilitar el contador diario de calorías.</p>
            </div>
          )}

          <div style={{ background: '#FFF', border: '1px solid #E0E0E0', padding: '20px', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#E91E63' }}>Receta Destacada 🥪</h3>
            <h4 style={{ margin: '5px 0' }}>Jamón de Beterraga Casero</h4>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '5px 0' }}>120 kcal por porción | 18g Proteína</p>
            <p style={{ fontSize: '0.85rem' }}>Alternativa baja en sodio y libre de conservantes artificiales para los lonches escolares.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CCC', marginTop: '4px' };
const btnStyle = { padding: '10px', background: '#2196F3', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };