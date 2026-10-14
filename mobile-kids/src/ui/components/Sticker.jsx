import React from 'react';
import { View } from 'react-native';

/**
 * Base visual del sistema: una "pegatina" con contorno grueso y sombra dura desplazada.
 * La sombra es una vista detrás (funciona igual en iOS, Android y web).
 * Props: t (tema), bg, radius ('sm'|'md'|'lg'|'pill'), offset (px que se hunde al presionar), style
 */
export default function Sticker({ t, bg, radius = 'md', pressed = false, flat = false, style, children }) {
  const r = t.r[radius] ?? t.r.md;
  const off = flat ? 0 : (pressed ? 1 : t.shadowOffset);
  return (
    <View style={[{ paddingRight: t.shadowOffset, paddingBottom: t.shadowOffset }, style]}>
      {!flat && <View style={{ position: 'absolute', left: t.shadowOffset, top: t.shadowOffset, right: 0, bottom: 0, borderRadius: r, backgroundColor: t.shadow }} />}
      <View style={{
        borderRadius: r, borderWidth: t.border, borderColor: t.line, backgroundColor: bg ?? t.surface,
        transform: [{ translateX: pressed ? t.shadowOffset - off : 0 }, { translateY: pressed ? t.shadowOffset - off : 0 }],
        overflow: 'hidden', flexGrow: 1,
      }}>
        {children}
      </View>
    </View>
  );
}
