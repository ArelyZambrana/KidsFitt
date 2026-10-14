import { body, title as titleFont } from '../../styles/fonts';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Chip, CharacterFrame, ScreenShell, Sticker } from '../components';

const TONE = { 1: 'rest', 2: 'energy', 3: 'win' };

/** Inicio del niño. Solo visual: recibe datos y callbacks. Conecta: Persona 5 (rutinas) / Persona 8 (datos). */
export default function HomeView({ t, child, character, routines, onStart, onOpenCollection }) {
  return (
    <ScreenShell t={t}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text accessibilityRole="header" style={{ color: t.text, fontSize: t.size.h1, ...titleFont }}>¡Hola, {child.name}!</Text>
        <Chip t={t} tone="reward" label={`${child.points} pts`} />
      </View>
      <View style={{ alignItems: 'center', gap: 12, paddingVertical: 6 }}>
        <CharacterFrame t={t} character={character} size="lg" state="selected" still={child.settings.stillCharacters} />
        <Button t={t} variant="ghost" label="Mis personajes" icon="★" onPress={onOpenCollection} />
      </View>
      <Text accessibilityRole="header" style={{ color: t.text, fontSize: t.size.h3, ...titleFont }}>Elige tu rutina</Text>
      {routines.map((r) => (
        <Pressable key={r.id} accessibilityRole="button" accessibilityLabel={`${r.name}, ${r.levelName}, ${r.minutes} minutos, ${r.rounds} rondas`} onPress={() => onStart?.(r)}>
          {({ pressed }) => (
            <Sticker t={t} radius="md" pressed={pressed}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, minHeight: 72 }}>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={{ color: t.text, fontSize: 19, ...titleFont }}>{r.name}</Text>
                  <Text style={{ color: t.muted, fontSize: t.size.small, ...body('800') }}>{r.rounds} rondas · {r.minutes} min · +{r.points} pts</Text>
                </View>
                <Chip t={t} tone={TONE[r.level]} label={r.levelName} />
              </View>
            </Sticker>
          )}
        </Pressable>
      ))}
    </ScreenShell>
  );
}
