import { body, title as titleFont } from '../../styles/fonts';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Chip, CharacterFrame, ScreenShell, StatTile } from '../components';

/** Pantalla de victoria. Conecta: Persona 6 (resultado) con el `session` que devuelve POST /api/workout/sync. */
export default function VictoryView({ t, character, result, showKcal = true, onDone, still }) {
  const complete = result.roundsDone >= result.rounds;
  return (
    <ScreenShell t={t} scroll={false}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <CharacterFrame t={t} character={character} size="md" state="selected" still={still} />
        <Text accessibilityRole="header" style={{ color: t.text, fontSize: t.size.h1, ...titleFont, textAlign: 'center' }}>{complete ? '¡Rutina completa!' : '¡Buen intento!'}</Text>
        <Chip t={t} tone="win" label={`${result.roundsDone} de ${result.rounds} rondas`} />
        <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
          <StatTile t={t} tone="reward" label={result.bonusPoints ? `puntos (${result.bonusPoints} del minijuego)` : 'puntos'} value={`+${result.points}`} />
          <StatTile t={t} tone="rest" label="min de movimiento" value={result.minutes} />
        </View>
        {showKcal && result.kcal != null ? <Text style={{ color: t.muted, fontSize: t.size.small, ...body('800') }}>Energía aproximada: {result.kcal} kcal</Text> : null}
      </View>
      <Button t={t} variant="primary" label="Volver al inicio" onPress={onDone} />
    </ScreenShell>
  );
}
