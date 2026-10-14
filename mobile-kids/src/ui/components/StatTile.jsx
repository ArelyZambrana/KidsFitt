import { body, title as titleFont } from '../../styles/fonts';
import React from 'react';
import { Text, View } from 'react-native';
import Sticker from './Sticker';

export default function StatTile({ t, label, value, tone = 'reward' }) {
  return (
    <Sticker t={t} bg={t.surface} radius="md" style={{ flex: 1, minWidth: 120, alignSelf: 'stretch' }}>
      <View style={{ padding: 12, gap: 2 }}>
        <View style={{ width: 28, height: 6, borderRadius: 3, backgroundColor: t.accent[tone] }} />
        <Text style={{ color: t.text, fontSize: t.size.h2, ...titleFont }}>{value}</Text>
        <Text style={{ color: t.muted, fontSize: t.size.small, ...body('800') }}>{label}</Text>
      </View>
    </Sticker>
  );
}
