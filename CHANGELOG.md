# Anthem Changelog

<!-- https://keepachangelog.com/en/1.0.0/ -->

## [0.17.0] (unreleased)
### Added
- Add 23 more countries from the Flags project (Albania, Austria, Belgium,
  Switzerland, Czech Republic, Germany, Denmark, Egypt, Spain, France, United
  Kingdom, Hungary, Iran, Italy, Luxembourg, Netherlands, Norway, Poland,
  Palestine, Portugal, Tunisia, Ukraine and Vatican City) with their anthem
  recordings, as **beta** — their intro points and 🎼 melodies are still to do
- Two new round sounds: a rising fanfare when a round is played to the end, and
  a softer two-tone when the player ends it early with ⏹️
- Keep a result per finished round while game mode is on — `{ solved, total,
  elapsedMs, mistakes, giveUps, mode }`, where `mode` records which
  language/anthem type it was played in. A round that ran to the end is simply
  one where `solved === total`. The list is cleared on leaving game mode
### Changed
- Merge the ✋ stop and 🔄 restart buttons into one media-style control: it shows
  ⏹️ while a round is running and ▶️ once it has ended, so the same spot always
  stops or starts

## [0.16.0] 2026-07-30
### Added
- Initial release, split out from the Flags project: an app focused on national
  anthems only. Countries: United Arab Emirates 🇦🇪, Greece 🇬🇷, Iraq 🇮🇶,
  Lebanon 🇱🇧, Oman 🇴🇲, Sweden 🇸🇪, Syria 🇸🇾, Thailand 🇹🇭, Turkey 🇹🇷 and the
  United States 🇺🇸
- Choose the anthem type from the toolbar dropdown — 🎺 Instrument (recorded
  performance), 🎤 Vocal (sung in the country's native language), 🎼 Notes (the
  melody synthesized live in the browser from stored notes), 🥁 Intro (the
  anthem's own drum/instrumental intro) and 🥁🎺 Intro + Instrument (both, back to
  back). This replaces the old `xa`/`xt` pseudo-language codes from Flags
- A country that lacks the selected type is shown **disabled** rather than
  hidden, so the board stays stable while switching types. Availability comes
  from the country data (`anthem.intro`, `anthem.hasVocal`)
- One recording per country serves all three instrumental renderings: the
  country file records where the intro ends (`anthem.intro`, in seconds) and
  playback windows into `anthem/<code>.aac` — 🥁 plays 0 → intro, 🎺 plays
  intro → end, 🥁🎺 plays the whole file. No split or stitched files, so a
  country needs one third of the audio and the 🥁🎺 join is the original
  recording (seamless by construction)
- Each card shows either the country's flag or its name — a toggle in the
  settings panel (🏳️ flag / 🔤 name)
- Interface localized in English, Arabic, Greek, Swedish, Thai and Turkish (👁️
  dropdown in settings), following the browser language on first run; Arabic lays
  the cards out right-to-left. Country names are translated into all six
- Guessing game (🕹️): a random country's anthem plays and you tap the matching
  card, with live score, give-up (🤷‍♂️) and round controls (👂 ✋ 🔄), shared
  with the sister apps
- Theme (system / light / dark), flight-mode offline caching (✈️) of the visible
  anthems, and a `?f=` URL parameter to preset which countries are shown
- Bundle a `flags` webfont (`public/flags.woff2`) and use it wherever a country
  flag emoji is shown (the card faces in Flag display mode and the settings flag
  grid), so flags render on platforms whose OS lacks flag-emoji glyphs (e.g.
  Windows/Chromium), with the platform emoji fonts as fallback
- Built on the shared architecture of the sister apps (Vite, React 19,
  TypeScript 6): `useAudio`, `useGame`, `GameHud`, `useFitText`, the IndexedDB
  audio cache and the i18n helper
