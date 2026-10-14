import { title as titleFont } from '../../styles/fonts';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Button from './Button';

// Marco común de pantalla: fondo del tema, título y botón de volver. El color NUNCA es el fondo de la pantalla.
export default function ScreenShell({ t, title, onBack, right, scroll = true, children }) {
  const Body = scroll ? ScrollView : View;
  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Body style={{ flex: 1 }} contentContainerStyle={scroll ? { padding: 16, gap: 14, flexGrow: 1 } : undefined}>
        {(onBack || right) && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: t.touchMin }}>
            {onBack ? <Button t={t} variant="ghost" label="‹ Volver" onPress={onBack} /> : <View />}
            {right ?? <View />}
          </View>
        )}
        {title ? <Text accessibilityRole="header" style={{ color: t.text, fontSize: t.size.h1, ...titleFont }}>{title}</Text> : null}
        {scroll ? children : <View style={{ flex: 1, padding: 16, gap: 14 }}>{children}</View>}
      </Body>
    </View>
  );
}
