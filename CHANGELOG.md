# Anthem Changelog

<!-- https://keepachangelog.com/en/1.0.0/ -->

## [0.16.0] 2026-07-25

## [0.1.0] 2026-07-25
### Added
- Initial release, split out from the Flags project: an app focused on national
  anthems only. Two countries to start — Syria 🇸🇾 and Iraq 🇮🇶
- Choose the anthem type from the toolbar dropdown: 🎺 Instrument (recorded
  performance) or 🎹 Tonal (pure-tone melody). This replaces the old `xa`/`xt`
  pseudo-language codes from Flags
- Each card shows either the country's flag or its name — a toggle in the
  settings panel (🏳️ flag / 🔤 name)
- Interface localized in English and Arabic (👁️ dropdown in settings), following
  the browser language on first run; Arabic lays the cards out right-to-left
- Guessing game (🕹️): a random country's anthem plays and you tap the matching
  card, with live score, give-up (🤷‍♂️) and round controls (👂 ✋ 🔄), shared
  with the sister apps
- Theme (system / light / dark), flight-mode offline caching (✈️) of the visible
  anthems, and a `?f=` URL parameter to preset which countries are shown
- Built on the shared architecture of the sister apps (Vite, React 19,
  TypeScript 6): `useAudio`, `useGame`, `GameHud`, `useFitText`, the IndexedDB
  audio cache and the i18n helper
