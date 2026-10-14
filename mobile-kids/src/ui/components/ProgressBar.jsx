import { body } from '../../styles/fonts';
import React from 'react';
import { View, Text } from 'react-native';

// value 0–1. Muestra el porcentaje en texto (no solo color).
export default function ProgressBar({ t, value, tone = 'primary', label }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <View accessible accessibilityRole="progressbar" accessibilityLabel={`${label ?? 'Progreso'} ${pct} por ciento`} style={{ width: '100%', gap: 4 }}>
      <View style={{ height: 18, borderRadius: 9, borderWidth: t.border, borderColor: t.line, backgroundColor: t.soft, overflow: 'hidden' }}>
        <View style={{ width: `${pct}%`, height: '100%', backgroundColor: t.accent[tone] }} />
      </View>
      {label ? <Text style={{ color: t.muted, fontSize: t.size.small, ...body('800') }}>{label} · {pct} %</Text> : null}
    </View>
  );
}
