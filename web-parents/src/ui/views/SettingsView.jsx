import React from 'react';
import { Card } from '../components';

const OPTS = [['stillCharacters', 'Personajes quietos (sin animaciones)'], ['showKcal', 'Mostrar energía aproximada al niño'], ['music', 'Música'], ['effects', 'Efectos de sonido']];

/** Ajustes del niño. Conecta: Persona 7 con PATCH /children/:id/settings. */
export default function SettingsView({ child, settings, onToggle }) {
  return (
    <>
      <h1>Ajustes de {child.name}</h1>
      <Card>{OPTS.map(([k, label]) => <label key={k} className="toggle"><input type="checkbox" checked={!!settings[k]} onChange={() => onToggle?.(k)} /> {label}</label>)}</Card>
    </>
  );
}
