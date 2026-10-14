import { Platform } from 'react-native';

// Tipografías. En el navegador se elige el peso con fontWeight; en iOS/Android cada peso es un archivo distinto
// y se llama por nombre (registrados en App.js con expo-font). Úsalas con spread:  <Text style={{ ...body('900') }}>
const NUNITO = { '600': 'Nunito-600', '700': 'Nunito-700', '800': 'Nunito-800', '900': 'Nunito-900' };

export const body = (weight = '700') =>
  Platform.OS === 'web' ? { fontFamily: 'Nunito', fontWeight: weight } : { fontFamily: NUNITO[weight] || NUNITO['700'], fontWeight: 'normal' };

export const title = Platform.OS === 'web' ? { fontFamily: 'Fredoka', fontWeight: '700' } : { fontFamily: 'Fredoka', fontWeight: 'normal' };
