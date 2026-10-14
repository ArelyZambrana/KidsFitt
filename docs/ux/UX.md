# KidsFit · Guía de diseño (Persona 4 · líder UX)

Identidad: **"Álbum de pegatinas"** — papel crema, contornos gruesos de tinta, sombras duras y personajes como pegatinas.
Los personajes (Cartoon Network, Nickelodeon, Mattel, videojuegos…) son los protagonistas; la interfaz es el álbum donde se pegan.

## Qué hay en esta entrega
| Qué | Dónde | Quién lo conecta |
|---|---|---|
| Tokens (colores, medidas, tipografías) | `shared/design/tokens.json` → `node shared/design/build.js` genera los de móvil y web | nadie los edita a mano, solo Persona 4 |
| Componentes móviles | `mobile-kids/src/ui/components/` | todos los usan |
| Pantallas móviles (solo visuales) | `mobile-kids/src/ui/screens/` | P5 (ejercicio/descanso), P6 (victoria/minijuego), P8 (datos) |
| Componentes y vistas del panel | `web-parents/src/ui/` | P2 (panel), P3 (recetas), P7 (ajustes) |
| 16 personajes (GIF + PNG fijo) | `mobile-kids/assets/characters/` | P8 (API de colección) |
| Galería para ver todo sin Expo | `cd mobile-kids && npm run preview` (puerto 5174) y `cd web-parents && npm run dev` | todos |

**Regla de oro:** las vistas de `ui/` no tienen lógica (ni temporizadores, ni llamadas a la API). Reciben datos y funciones por props. Así el diseño y la lógica no se pisan.

## Cómo conectar tu parte
- **Persona 5** — `WorkoutScreen.jsx`: tu `Timer` calcula `secondsLeft`; renderiza `<ExerciseView … />` o `<RestView … />` con esos valores. Tú decides cuándo cambiar de fase.
- **Persona 6** — `TapCounter` guarda los toques; pásalos a `<RestView taps maxTaps onTap />`. `VictoryScreen.jsx` renderiza `<VictoryView result={session} />` con lo que devuelve `POST /api/workout/sync`.
- **Persona 8** — reemplaza `src/ui/mock/` por llamadas a tu `api.js`. `CollectionView` pide `onPick(character)`: tú decides si es elegir (`select`) o comprar (`unlock`).
- **Persona 2** — `<DashboardView child weekly last measurements sessions />` con `/summary/weekly`, `/measurements`, `/sessions`.
- **Persona 3** — `<RecipesView recipes filters onFilters />` con `GET /api/recipes?q=…`.
- **Persona 7** — `<SettingsView child settings onToggle />` con `PATCH /children/:id/settings`.

Nombres de datos esperados (los mismos de la API): `child {name, points, unlockedCharacters, selectedCharacter, settings}`, `routine {id, name, rounds, minutes, level, levelName, points}`, `character {id, name, origin, src, still, accentColor, cost}`, `result {roundsDone, rounds, points, bonusPoints, minutes, kcal}`.

## Colores
| Token | Valor | Para qué | Texto encima |
|---|---|---|---|
| ink | `#1B1B2F` | texto, contornos | — |
| paper | `#FFF8EC` | fondo | tinta |
| primary | `#3D5AFE` | acción principal | blanco |
| energy | `#FF6B2C` | ejercicio, nivel medio | tinta |
| rest | `#2EC4A0` | descanso, nivel suave | tinta |
| win | `#7C3AED` | logros, nivel alto | blanco |
| reward | `#FFC933` | puntos y premios | tinta |

Todos los pares texto/fondo se comprueban con `node shared/design/build.js` (mínimo 4.5:1, WCAG AA). Si cambias un color y no pasa, el script falla.

## Reglas que no se negocian
1. **El color nunca va solo.** Cada estado lleva texto y símbolo (● ▲ ◆ ★ ✦). Un niño o padre con daltonismo debe entender igual.
2. **El color de acento no es fondo de pantalla.** Las pantallas usan papel (claro) o tinta (modo rutina, oscuro).
3. **Botones ≥ 48 px de alto y texto ≥ 15 px.** Ningún botón es solo un icono.
4. **Personajes:** imagen completa (`contain`), nunca recortada; fondo neutro fijo; nombre y origen en una pegatina fuera del área de la imagen; solo se anima el personaje grande y desbloqueado; con "Personajes quietos" se usa el PNG fijo. GIF ≤ 2 MB.
5. **Tipografías:** Fredoka (títulos) y Nunito (texto). En móvil se cargan con `expo-font` (ver `App.js`); en web, `@fontsource`.
6. **Rutina en modo oscuro**, resto en claro. No mezclar.

## Cómo agregar un personaje
1. GIF y PNG con el cuadro fijo en `mobile-kids/assets/characters/` (mismo nombre: `x.gif`, `x.png`).
2. Una línea por archivo en `mobile-kids/src/ui/characterImages.js`.
3. Su ficha en la lista de personajes (API/seed): `id, name, origin, src, still, accentColor, cost`.
4. Revisa en la galería que se vea completo y que el nombre no se corte.

## Pendiente de UX (honesto)
- **Probado en navegador, no en celular.** Las capturas salen de la galería web (react-native-web). Falta una pasada en Expo Go/Android real: sombras, fuentes por peso y toques.
- Faltan pantallas: crear perfil, ajustes del niño, onboarding y estados vacíos/de error del panel.
- Audio (música/efectos con `expo-av`) y animaciones de transición.
- Los personajes y la presencia de marcas ajenas son solo para el proyecto de asignatura; no se pueden publicar así.
