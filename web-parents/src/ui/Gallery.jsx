import React, { useState } from 'react';
import DashboardView from './views/DashboardView';
import RecipesView from './views/RecipesView';
import SettingsView from './views/SettingsView';
import { child, weekly, lastMeasurement, measurements, sessions, recipes } from './mock/data';

const TABS = [['panel', 'Panel'], ['recetas', 'Recetas'], ['ajustes', 'Ajustes']];

// Galería del panel con datos de mentira. La app real reemplaza los mocks por llamadas a la API.
export default function Gallery() {
  const q = new URLSearchParams(location.search);
  const [tab, setTab] = useState(q.get('tab') || 'panel');
  const [settings, setSettings] = useState({ stillCharacters: false, showKcal: true, music: true, effects: true });
  return (
    <div className="shell">
      <aside className="side">
        <div className="brand">KidsFit · Padres</div>
        <nav className="nav" aria-label="Secciones">
          {TABS.map(([id, label]) => <button key={id} aria-current={tab === id ? 'page' : undefined} onClick={() => setTab(id)}>{label}</button>)}
        </nav>
      </aside>
      <main>
        {tab === 'panel' && <DashboardView child={child} weekly={weekly} last={lastMeasurement} measurements={measurements} sessions={sessions} />}
        {tab === 'recetas' && <RecipesView recipes={recipes} />}
        {tab === 'ajustes' && <SettingsView child={child} settings={settings} onToggle={(k) => setSettings({ ...settings, [k]: !settings[k] })} />}
      </main>
    </div>
  );
}
