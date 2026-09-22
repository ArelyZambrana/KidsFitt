import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RewardScreen from './RewardScreen';
import { syncWorkoutData } from '../services/syncService';

export default function WorkoutScreen() {
  const [phase, setPhase] = useState('EXERCISE'); // 'EXERCISE' | 'MINIGAME' | 'FINISHED'
  const [timer, setTimer] = useState(15); // 15s para demo rápida
  const [points, setPoints] = useState(0);
  const [roundsLeft, setRoundsLeft] = useState(2); // 2 rondas de ejercicio para la demo

  useEffect(() => {
    let interval = null;
    if (phase !== 'FINISHED' && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      if (phase === 'EXERCISE') {
        setPhase('MINIGAME');
        setTimer(10); // Minijuego corto para pruebas
      } else if (phase === 'MINIGAME') {
        if (roundsLeft > 1) {
          setRoundsLeft((prev) => prev - 1);
          setPhase('EXERCISE');
          setTimer(15);
        } else {
          // Fin del entrenamiento: Sincronizar con el backend
          setPhase('FINISHED');
          syncWorkoutData('child_123', points + 50, 45);
        }
      }
    }
    return () => clearInterval(interval);
  }, [timer, phase, roundsLeft]);

  const handleTapMinigame = () => {
    if (phase === 'MINIGAME') {
      setPoints((prev) => prev + 10);
    }
  };

  const handleRestart = () => {
    setPoints(0);
    setRoundsLeft(2);
    setPhase('EXERCISE');
    setTimer(15);
  };

  if (phase === 'FINISHED') {
    return <RewardScreen points={points + 50} onRestart={handleRestart} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: phase === 'EXERCISE' ? '#FF5722' : '#4CAF50' }]}>
      <Text style={styles.pointsText}>Puntos: {points} ⭐ | Rondas restantes: {roundsLeft}</Text>

      {phase === 'EXERCISE' ? (
        <View style={styles.card}>
          <Text style={styles.title}>¡HORA DE MOVERSE! 🏃‍♂️</Text>
          <View style={styles.animationBox}>
            <Text style={styles.exerciseText}>¡HAZ JUMPING JACKS AL RITMO!</Text>
          </View>
          <Text style={styles.timerText}>Descanso en: {timer}s</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>🎮 MINIJUEGO DE DESCANSO</Text>
          <Text style={styles.subtitle}>¡Toca la pantalla para juntar energía!</Text>
          <TouchableOpacity style={styles.gameButton} onPress={handleTapMinigame}>
            <Text style={styles.gameButtonText}>¡TOCA AQUÍ RÁPIDO!</Text>
          </TouchableOpacity>
          <Text style={styles.timerText}>Volvemos al ejercicio en: {timer}s</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  pointsText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '100%', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 15 },
  animationBox: { width: '100%', height: 140, backgroundColor: '#FFE0B2', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 15 },
  exerciseText: { fontSize: 16, fontWeight: 'bold', color: '#E65100', textAlign: 'center' },
  gameButton: { backgroundColor: '#2196F3', padding: 20, borderRadius: 10, marginVertical: 15, width: '100%', alignItems: 'center' },
  gameButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  timerText: { fontSize: 16, fontWeight: 'bold', marginTop: 10 }
});