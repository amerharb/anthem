[![Version](https://img.shields.io/badge/version-0.16.0-blue.svg)](https://github.com/amerharb/anthem)
# Anthem

Small React project to play national anthems and guess the country. Pick an
anthem type (🎺 instrument or 🎹 tonal), then listen and recognise the country.
Sister project of [Flags](https://github.com/amerharb/flags),
[Colors](https://github.com/amerharb/colors),
[Week](https://github.com/amerharb/week) and
[Arqaam](https://github.com/amerharb/arqaam).

## Countries supported
- Syria 🇸🇾
- Iraq 🇮🇶
- More to come, see How to contribute

## Anthem types
- 🎺 **Instrument** — a recorded instrumental performance of the anthem
- 🎹 **Tonal** — a pure-tone rendering of the melody's main notes

## Interface languages
- English
- Arabic (عربي)

## How it works
Pick the anthem type from the dropdown in the top right, then click a card to
hear that country's anthem. Each card shows either the country's **flag** or its
**name** — switch between them in settings.

### URL parameters
The visible countries can be set from the URL, for a shareable view:

- `f` — comma-separated country codes to show, e.g. `?f=sy,iq`

- Mute (🔊/🔇, right of 🕹️): silences everything — anthems, game prompts and
  feedback sounds — until clicked again.
- Settings (⚙️ top right): theme (system / light / dark, system is the default),
  interface language (👁️ English / عربي), how each card is shown (🏳️ flag or 🔤
  name), a country grid to show/hide countries (with ✅/⬜ select-all/deselect-all
  buttons), a flight mode toggle (✈️), and cache info (🔊 count and a 🗑️ clear
  button). Saved in localStorage, remembered between visits.
- Flight mode (✈️): downloads all visible anthems to the cache; anything newly
  shown while it is on is downloaded right away. Turning it off keeps the cached
  files.
- Game (🕹️ in the top bar): start a guessing game — a random country's anthem is
  played and you tap the matching card (👍 correct, 👎 wrong). Stuck? The give-up
  button (🤷‍♂️) reveals it (tracked separately from mistakes). It runs through
  every visible country, with your progress (played, mistakes, give-ups, time)
  shown live in the app bar. ✋ stops a round early, 🔄 starts a fresh one, and
  pressing 🕹️ again leaves game mode. Needs at least one country visible.
- First visit: the interface language comes from your browser's language settings.

## How to contribute
### Media files
To support a new country, one AAC audio file is needed per anthem type:
`public/sound/instrument/<code>.aac` and `public/sound/tonal/<code>.aac`.

### Coding
Anthem is an open source project built on Vite, React 19, TypeScript v6.x and
npm. All the code is Frontend, no backend needed.

To add a country:
1. Create `src/countries/<code>.ts` exporting a `Country` (`code`, `name`, `flag`)
   with the name in English and Arabic.
2. Import it and add it to the `ALL_COUNTRIES` array in `src/App.tsx`.
3. Drop the audio at `public/sound/instrument/<code>.aac` and
   `public/sound/tonal/<code>.aac`.

#### Setup environment
- Node 20.19 or above
- npm 9.x or above
- Install `npm install`
- Build: `npm run build` (output in `dist/`)
- Start dev server: `npm start`
- Preview production build: `npm run preview`

### Deploying
Once a PR is merged to the main branch it is automatically deployed using the
Vercel integration tool with GitHub.

## Credits
### For sound
- National anthem recordings: [Wikimedia Commons](https://commons.wikimedia.org/)
  public-domain uploads, including performances by the United States Navy Band
- 🎹 pure-tone anthems: synthesized as sine tones from the melody (top voice) of
  public-domain MIDI transcriptions
