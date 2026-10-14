import { body } from '../../styles/fonts';
import React from 'react';
import { Pressable, Text } from 'react-native';
import Sticker from './Sticker';

/**
 * Botón. variant: 'primary' | 'energy' | 'rest' | 'win' | 'reward' | 'ghost'.
 * Altura mínima 48 px. El texto siempre explica la acción (no solo un icono).
 */
export default function Button({ t, label, onPress, variant = 'primary', icon, disabled, style }) {
  const ghost = variant === 'ghost';
  const bg = ghost ? t.surface : t.accent[variant];
  const color = ghost ? t.text : t.onAccent[variant];
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled: !!disabled }}
      disabled={disabled} onPress={onPress} style={[{ opacity: disabled ? 0.5 : 1 }, style]}>
      {({ pressed }) => (
        <Sticker t={t} bg={bg} radius="md" pressed={pressed}>
          <Text style={{ minHeight: t.touchMin - t.border * 2, paddingHorizontal: 20, paddingVertical: 10, textAlign: 'center', textAlignVertical: 'center', lineHeight: 24, fontSize: 18, ...body('900'), color }}>
            {icon ? `${icon}  ` : ''}{label}
          </Text>
        </Sticker>
      )}
    </Pressable>
  );
}
