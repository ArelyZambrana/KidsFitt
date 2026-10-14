import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { theme } from '../styles/theme';
import { HomeView, CollectionView, ExerciseView, RestView, VictoryView } from './screens';
import { characters, child, routines, exercise, result } from './mock/data';

const chr = (id) => characters.find((c) => c.id === id);

// Galería de pantallas con datos de mentira. Sirve para VER el diseño y como ejemplo de cómo se usa cada vista.
const SCREENS = [
  ['Inicio', false, (t) => <HomeView t={t} child={child} character={chr(child.selectedCharacter)} routines={routines} onStart={() => {}} onOpenCollection={() => {}} />],
  ['Colección', false, (t) => <CollectionView t={t} child={child} characters={characters} filter="todos" onBack={() => {}} />],
  ['Colección (bloqueados)', false, (t) => <CollectionView t={t} child={child} characters={characters} filter="bloqueados" message="Te faltan 50 puntos" onBack={() => {}} />],
  ['Ejercicio', true, (t) => <ExerciseView t={t} character={chr('bob')} exercise={exercise} round={2} rounds={4} secondsLeft={12} totalSeconds={20} paused={false} />],
  ['Descanso', true, (t) => <RestView t={t} character={chr('bob')} round={2} rounds={4} secondsLeft={7} totalSeconds={12} taps={6} maxTaps={15} />],
  ['Victoria', false, (t) => <VictoryView t={t} character={chr('bob')} result={result} />],
  ['Victoria parcial', false, (t) => <VictoryView t={t} character={chr('osos')} result={{ ...result, roundsDone: 2, points: 60, bonusPoints: 0, minutes: 6, kcal: 11 }} />],
];

export default function Gallery({ initial = 0, initialDark = false, controls = true }) {
  const [i, setI] = useState(initial);
  const [dark, setDark] = useState(initialDark);
  const [name, forceDark, render] = SCREENS[i];
  const t = theme(forceDark || dark);
  const tc = theme(false);
  return (
    <View style={{ flex: 1, backgroundColor: '#E8DFCB' }}>
      <View style={{ flex: 1 }}>{render(t)}</View>
      {controls && (
        <View style={{ backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#1B1B2F' }}>
          <ScrollView horizontal contentContainerStyle={{ padding: 8, gap: 6 }}>
            {SCREENS.map(([n], k) => (
              <Pressable key={n} onPress={() => setI(k)} accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 10, borderWidth: 2, borderColor: '#1B1B2F', backgroundColor: k === i ? '#3D5AFE' : '#fff' }}>
                <Text style={{ color: k === i ? '#fff' : '#1B1B2F', fontWeight: '800', fontSize: 15 }}>{n}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setDark(!dark)} accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 10, borderWidth: 2, borderColor: '#1B1B2F', backgroundColor: '#FFC933' }}>
              <Text style={{ color: '#1B1B2F', fontWeight: '900', fontSize: 15 }}>{dark ? '☀ Claro' : '☾ Oscuro'}</Text>
            </Pressable>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
export { SCREENS };
