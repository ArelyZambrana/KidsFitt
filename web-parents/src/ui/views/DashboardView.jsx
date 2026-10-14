import React from 'react';
import { Card, Chip, Stat, WeeklyChart, Field, Button } from '../components';

const CAT = { delgadez: ['Delgadez', 'energy'], normal: ['Normal', 'rest'], sobrepeso: ['Sobrepeso', 'energy'], obesidad: ['Obesidad', 'win'] };

/** Panel principal del padre. Solo visual. Conecta: Persona 2 con GET /summary/weekly, /measurements y /sessions. */
export default function DashboardView({ child, weekly, last, measurements, sessions, onSaveMeasurement }) {
  const pct = Math.min(100, Math.round((100 * weekly.minutes) / weekly.goalMinutes));
  const [label, tone] = CAT[last.category];
  return (
    <>
      <h1>Panel de {child.name}</h1>
      <div className="stats">
        <Stat tone="primary" value={`${weekly.minutes} / ${weekly.goalMinutes} min`} label={`Meta semanal (${pct} %)`} />
        <Stat tone="reward" value={weekly.points} label="Puntos ganados" />
        <Stat tone="rest" value={`${weekly.kcal} kcal`} label="Energía aprox." />
        <Stat tone="win" value={child.points} label="Saldo de puntos" />
      </div>
      <Card title="Minutos por día"><WeeklyChart days={weekly.days} /></Card>
      <Card title="Última medida">
        <p style={{ margin: 0 }}>IMC <b>{last.bmi}</b> · z = <b>{last.z}</b> · <Chip tone={tone}>{label}</Chip></p>
        <p className="muted" style={{ marginBottom: 0 }}>Referencia de la OMS para 5–19 años. Orienta, no diagnostica: ante dudas, consulta al pediatra.</p>
      </Card>
      <Card title="Registrar medida">
        <form className="row" onSubmit={(e) => { e.preventDefault(); onSaveMeasurement?.(); }}>
          <Field label="Peso (kg)"><input inputMode="decimal" required /></Field>
          <Field label="Talla (cm)"><input inputMode="decimal" required /></Field>
          <Button type="submit">Guardar medida</Button>
        </form>
      </Card>
      <Card title="Historial de medidas">
        <div className="scroll"><table><thead><tr><th>Fecha</th><th>Peso</th><th>Talla</th><th>IMC</th><th>z</th><th>Categoría</th></tr></thead>
          <tbody>{measurements.map((m) => <tr key={m.id}><td>{m.date}</td><td>{m.weightKg} kg</td><td>{m.heightCm} cm</td><td>{m.bmi}</td><td>{m.z}</td><td>{CAT[m.category][0]}</td></tr>)}</tbody></table></div>
      </Card>
      <Card title="Historial de sesiones">
        <div className="scroll"><table><thead><tr><th>Fecha</th><th>Rutina</th><th>Rondas</th><th>Min</th><th>Puntos</th><th>Energía aprox.</th></tr></thead>
          <tbody>{sessions.map((s) => <tr key={s.id}><td>{s.date}</td><td>{s.routine}</td><td>{s.rounds}</td><td>{s.minutes}</td><td>{s.points}</td><td>{s.kcal} kcal</td></tr>)}</tbody></table></div>
        <p className="muted" style={{ marginBottom: 0 }}>Energía estimada = MET × peso (kg) × horas. Es una aproximación, no una medición.</p>
      </Card>
    </>
  );
}
