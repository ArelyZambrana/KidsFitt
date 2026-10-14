import { body, title as titleFont } from '../../styles/fonts';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Chip, CharacterFrame, ProgressBar, ScreenShell, Sticker } from '../components';

/**
 * Descanso con minijuego de toques (tema OSCURO). Lógica del minijuego: Persona 6. Temporizador: Persona 5.
 * Para otros minijuegos, reemplaza solo el bloque del botón grande; el resto de la pantalla se mantiene.
 */
export default function RestView({ t, character, round, rounds, secondsLeft, totalSeconds, taps, maxTaps, onTap, onSkip, onExit, still }) {
  return (
    <ScreenShell t={t} scroll={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button t={t} variant="ghost" label="Salir" onPress={onExit} />
        <Chip t={t} tone="rest" label="Descanso" />
        <Text style={{ color: t.muted, fontSize: t.size.small, ...body('900') }}>Ronda {round} de {rounds}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <CharacterFrame t={t} character={character} size="md" state="available" still={still} />
        <Text accessibilityRole="header" style={{ color: t.text, fontSize: t.size.h2, ...titleFont, textAlign: 'center' }}>Respira y toma agua</Text>
        <Text style={{ color: t.muted, fontSize: 17, ...body('700') }}>Mientras descansas, suma puntos extra</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={`Toca para sumar puntos. Llevas ${taps} de ${maxTaps}`} onPress={onTap}>
          {({ pressed }) => (
            <Sticker t={t} bg={t.accent.reward} radius="pill" pressed={pressed}>
              <View style={{ width: 132, height: 132, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: t.onAccent.reward, fontSize: 26, ...titleFont }}>¡Toca!</Text>
              </View>
            </Sticker>
          )}
        </Pressable>
        <Text style={{ color: t.text, fontSize: t.size.body, ...body('900') }}>{taps} / {maxTaps} toques · +{taps} pts</Text>
        <View style={{ width: '80%' }}><ProgressBar t={t} tone="rest" value={(totalSeconds - secondsLeft) / totalSeconds} label={`${secondsLeft} s para seguir`} /></View>
      </View>
      <View style={{ alignItems: 'center' }}><Button t={t} variant="ghost" label="Saltar descanso" onPress={onSkip} /></View>
    </ScreenShell>
  );
}
