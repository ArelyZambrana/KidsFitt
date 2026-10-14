import { body } from '../../styles/fonts';
import React from 'react';
import { Text } from 'react-native';
import Sticker from './Sticker';

// Etiqueta de estado. El color nunca va solo: siempre hay texto y un símbolo.
const SYMBOL = { primary: '●', energy: '▲', rest: '◆', win: '★', reward: '✦' };

export default function Chip({ t, label, tone = 'primary' }) {
  return (
    <Sticker t={t} bg={t.accent[tone]} radius="pill" flat style={{ paddingRight: 0, paddingBottom: 0, alignSelf: 'flex-start' }}>
      <Text style={{ paddingHorizontal: 12, paddingVertical: 4, fontSize: 15, ...body('900'), color: t.onAccent[tone] }}>
        {SYMBOL[tone]} {label}
      </Text>
    </Sticker>
  );
}
