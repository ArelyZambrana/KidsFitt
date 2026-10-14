import { body, title as titleFont } from '../../styles/fonts';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { tokens } from '../../styles/tokens';
import { characterImages } from '../characterImages';
import Sticker from './Sticker';

/**
 * Marco de personaje. REGLAS (no cambiar sin hablar con Persona 4):
 *  - La imagen siempre completa (contain), nunca recortada, sobre fondo neutro fijo.
 *  - Nombre + origen en una pegatina FUERA del área de la imagen.
 *  - Solo el personaje grande y no bloqueado se anima; en 'md'/'mini' y con "Personajes quietos" se usa el cuadro fijo.
 * Props: character {id,name,origin,src,still,accentColor,cost}, size 'lg'|'md'|'mini', state 'available'|'locked'|'selected', still (bool), t
 */
export default function CharacterFrame({ t, character, size = 'md', state = 'available', still = false }) {
  const px = tokens.character[size];
  const locked = state === 'locked';
  const selected = state === 'selected';
  const animate = size === 'lg' && !locked && !still;
  const source = characterImages[animate ? character.src : character.still];
  const img = (
    <View style={{ width: px, height: px, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1E7D3' }}>
      {source
        ? <Image source={source} resizeMode="contain" style={{ width: '88%', height: '88%', opacity: locked ? 0.18 : 1, tintColor: locked ? '#1B1B2F' : undefined }} />
        : <Text style={{ fontSize: px * 0.4, ...titleFont, color: character.accentColor }}>{character.name[0]}</Text>}
      {locked && <Text style={{ position: 'absolute', fontSize: 18, ...body('900'), color: '#1B1B2F' }}>🔒 {character.cost}</Text>}
    </View>
  );

  if (size === 'mini') {
    return (
      <View accessible accessibilityLabel={character.name} style={{ width: px, height: px, borderRadius: px / 2, overflow: 'hidden', borderWidth: t.border, borderColor: t.line }}>{img}</View>
    );
  }
  return (
    <View accessible accessibilityLabel={locked ? `${character.name}, bloqueado, cuesta ${character.cost} puntos` : `${character.name}, ${character.origin}${selected ? ', elegido' : ''}`}
      style={{ width: px + t.border * 2 + t.shadowOffset, gap: 8 }}>
      <Sticker t={t} bg="#F1E7D3" radius="lg" style={selected ? { transform: [{ rotate: '-1.5deg' }] } : undefined}>
        {img}
        {selected && (
          <View style={{ position: 'absolute', top: 8, right: 8, backgroundColor: t.accent.primary, borderRadius: 14, paddingHorizontal: 8, height: 28, justifyContent: 'center', borderWidth: 2, borderColor: t.line }}>
            <Text style={{ color: t.onAccent.primary, ...body('900'), fontSize: 14 }}>✓ Elegido</Text>
          </View>
        )}
      </Sticker>
      <Sticker t={t} bg={t.surface} radius="md" flat style={{ paddingRight: 0, paddingBottom: 0 }}>
        <View style={{ paddingHorizontal: 8, paddingVertical: 4, alignItems: 'center' }}>
          <Text numberOfLines={2} style={{ color: t.text, fontSize: 15, lineHeight: 18, ...body('900'), textAlign: 'center' }}>{locked ? '???' : character.name}</Text>
          {!locked && <Text numberOfLines={1} style={{ color: t.muted, fontSize: 13, lineHeight: 16, ...body('800'), textAlign: 'center' }}>{character.origin}</Text>}
        </View>
      </Sticker>
    </View>
  );
}
