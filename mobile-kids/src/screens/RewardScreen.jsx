import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function RewardScreen({ points, onRestart }) {
  return (
    <View style={styles.container}>
      <Text style={styles.trophy}>🏆</Text>
      <Text style={styles.title}>¡RUTINA COMPLETADA!</Text>
      <Text style={styles.subtitle}>¡Hiciste un trabajo increíble hoy!</Text>

      <View style={styles.badgeBox}>
        <Text style={styles.badgeText}>Ganaste +{points} Puntos KidsFit ⭐</Text>
        <Text style={styles.caloriesText}>🔥 Quemaste aprox. 45 kcal</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>VOLVER AL INICIO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#673AB7', justifyContent: 'center', alignItems: 'center', padding: 20 },
  trophy: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFD54F', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#FFF', textAlign: 'center', marginBottom: 30 },
  badgeBox: { backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 40, width: '100%' },
  badgeText: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  caloriesText: { fontSize: 16, color: '#B2EBF2', marginTop: 8 },
  button: { backgroundColor: '#FF4081', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});