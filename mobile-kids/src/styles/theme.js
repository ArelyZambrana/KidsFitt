import { tokens } from './tokens';

// theme(dark) devuelve todo lo que un componente necesita. Nunca uses colores sueltos en pantallas.
export const theme = (dark = false) => {
  const c = tokens.color;
  const d = tokens.dark;
  return {
    dark,
    bg: dark ? d.bg : c.paper,
    surface: dark ? d.surface : c.card,
    soft: dark ? d.soft : c.soft,
    line: dark ? d.line : c.ink,        // contorno de las pegatinas
    shadow: dark ? '#000000' : c.ink,
    text: dark ? d.text : c.ink,
    muted: dark ? d.muted : c.muted,
    accent: { primary: c.primary, energy: c.energy, rest: c.rest, win: c.win, reward: c.reward },
    onAccent: tokens.onAccent,
    primaryPressed: c.primaryPressed,
    r: tokens.radius, border: tokens.border, shadowOffset: tokens.shadow, touchMin: tokens.touchMin,
    font: { title: tokens.font.title, body: tokens.font.body },
    size: tokens.size,
  };
};
