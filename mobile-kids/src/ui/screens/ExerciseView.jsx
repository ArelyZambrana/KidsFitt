import { body, title as titleFont } from '../../styles/fonts';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, Chip, CharacterFrame, ProgressBar, ScreenShell } from '../components';

/**
 * Pantalla de ejercicio (tema OSCURO). Solo visual: la lógica del temporizador y las rondas es de Persona 5.
 * secondsLeft/totalSeconds los calcula el Timer de P5; aquí solo se dibujan.
 */
export default function ExerciseView({ t, character, exercise, round, rounds, secondsLeft, totalSeconds, paused, onPause, onFinishRound, onExit, still }) {
  return (
    <ScreenShell t={t} scroll={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button t={t} variant="ghost" label="Salir" onPress={onExit} />
        <Chip t={t} tone="energy" label="Energía" />
        <Text style={{ color: t.muted, fontSize: t.size.small, ...body('900') }}>Ronda {round} de {rounds}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <CharacterFrame t={t} character={character} size="md" state="available" still={still} />
        <Text accessibilityRole="header" style={{ color: t.text, fontSize: t.size.h1, ...titleFont, textAlign: 'center' }}>{exercise.name}</Text>
        <Text style={{ color: t.muted, fontSize: 17, ...body('700'), textAlign: 'center' }}>{exercise.hint}</Text>
        <Text accessibilityLiveRegion="polite" style={{ color: t.text, fontSize: t.size.display, ...titleFont }}>{secondsLeft}</Text>
        <ProgressBar t={t} tone="energy" value={(totalSeconds - secondsLeft) / totalSeconds} />
      </View>
      <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center' }}>
        <Button t={t} variant="ghost" label={paused ? 'Seguir' : 'Pausa'} onPress={onPause} />
        <Button t={t} variant="energy" label="¡Terminé la ronda!" onPress={onFinishRound} />
      </View>
    </ScreenShell>
  );
}
