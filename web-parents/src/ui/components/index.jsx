import React from 'react';

const SYMBOL = { primary: '●', energy: '▲', rest: '◆', win: '★', reward: '✦' };

// Pegatina (tarjeta). flat = sin sombra.
export const Card = ({ title, flat, children, className = '' }) => (
  <section className={`sticker ${flat ? 'flat' : ''} ${className}`}>{title && <h3 style={{ marginBottom: 12 }}>{title}</h3>}{children}</section>
);

// Etiqueta de estado: el color nunca va solo, siempre hay texto y símbolo.
export const Chip = ({ tone = 'primary', children }) => <span className={`chip ${tone}`}>{SYMBOL[tone]} {children}</span>;

export const Button = ({ variant, children, ...p }) => <button className={`btn ${variant || ''}`} {...p}>{children}</button>;

export const Stat = ({ label, value, tone = 'reward' }) => (
  <div className="sticker stat"><div className="bar-dot" style={{ background: `var(--c-${tone})` }} /><b>{value}</b><span className="muted">{label}</span></div>
);

// Minutos por día con línea de meta (60 min). La barra más alta va resaltada; los números van en texto.
export function WeeklyChart({ days, scale = 70, dailyGoal = 60 }) {
  const names = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const max = Math.max(...days.map((d) => d.minutes));
  return (
    <div role="img" aria-label={`Minutos por día. Meta diaria ${dailyGoal} minutos.`}>
      <div className="plot">
        <div className="goal" style={{ bottom: `${(dailyGoal / scale) * 100}%` }} />
        {days.map((d, i) => <div className="col" key={i}><div className={`bar ${d.minutes === max && max > 0 ? 'top' : ''}`} style={{ height: `${Math.min(d.minutes / scale, 1) * 100}%` }} /></div>)}
      </div>
      <div className="labels">{days.map((d, i) => <span key={i}>{names[i]}<br />{d.minutes}′</span>)}</div>
      <p className="muted" style={{ marginBottom: 0 }}>Línea punteada: meta de 60 min/día (OMS).</p>
    </div>
  );
}

export const Field = ({ label, children }) => <label>{label}{children}</label>;
