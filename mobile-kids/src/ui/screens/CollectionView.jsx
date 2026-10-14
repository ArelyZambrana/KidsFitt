import { body } from '../../styles/fonts';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Chip, CharacterFrame, ScreenShell } from '../components';

const FILTERS = [['todos', 'Todos'], ['mios', 'Míos'], ['bloqueados', 'Por desbloquear']];

/** Colección de personajes. Conecta: Persona 8 (unlock/select contra la API). onPick(character) decide si elegir o comprar. */
export default function CollectionView({ t, child, characters, filter = 'todos', onFilter, onPick, onBack, message }) {
  const owned = (c) => child.unlockedCharacters.includes(c.id);
  const list = characters.filter((c) => filter === 'todos' || (filter === 'mios' ? owned(c) : !owned(c)));
  return (
    <ScreenShell t={t} title="Mis personajes" onBack={onBack} right={<Chip t={t} tone="reward" label={`${child.points} pts`} />}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {FILTERS.map(([id, label]) => (
          <Button key={id} t={t} variant={filter === id ? 'primary' : 'ghost'} label={label} onPress={() => onFilter?.(id)} />
        ))}
      </View>
      {message ? <Text accessibilityLiveRegion="polite" style={{ color: t.text, fontSize: t.size.body, ...body('900') }}>{message}</Text> : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
        {list.map((c) => (
          <Pressable key={c.id} accessibilityRole="button" onPress={() => onPick?.(c)}>
            <CharacterFrame t={t} character={c} size="md" still={child.settings.stillCharacters}
              state={!owned(c) ? 'locked' : child.selectedCharacter === c.id ? 'selected' : 'available'} />
          </Pressable>
        ))}
      </View>
    </ScreenShell>
  );
}
