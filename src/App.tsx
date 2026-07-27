import './App.css'
import { useCallback, useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import SettingsPanel from './SettingsPanel'
import { GameScore, GameActions } from './GameHud'
import { Country, Language } from './countries/Country'
import { isVisible } from './featureFlags'
import {
	Settings,
	DisplayMode,
	DEFAULT_SETTINGS,
	loadSettings,
	saveSettings,
	applyTheme,
} from './settingsStore'
import { ensureCached, idbCount, idbClear } from './audioCache'
import { useAudio } from './useAudio'
import { useGame } from './useGame'
import { useFitText } from './useFitText'
import { translator, UI_LANGUAGES } from './i18n'
import { sy } from './countries/sy'
import { iq } from './countries/iq'

// Fisher–Yates shuffle into a new array (used to scramble the card positions on game start)
function shuffle<T>(items: T[]): T[] {
	const out = items.slice()
	for (let i = out.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[out[i], out[j]] = [out[j], out[i]]
	}
	return out
}

// the two kinds of anthem audio the app can play. This replaces the old
// "content language" dropdown: the choice is now which rendering you hear.
export type MusicType = 'instrument' | 'tonal'
const MUSIC_TYPES: { type: MusicType, icon: string, key: string }[] = [
	{ type: 'instrument', icon: '🎺', key: 'music.instrument' },
	{ type: 'tonal', icon: '🎹', key: 'music.tonal' },
]

function App() {
	// everything the build supports (after the beta feature flag)
	const ALL_COUNTRIES: Country[] = [sy, iq].filter(isVisible)

	// true while flight-mode downloads are in progress, to show it on the toggle
	const [caching, setCaching] = useState(false)
	// how many sound files are currently in the cache, shown in settings
	const [cachedCount, setCachedCount] = useState(0)

	const refreshCacheCount = useCallback(async () => {
		try {
			setCachedCount(await idbCount())
		} catch {
			// leave the previous count
		}
	}, [])
	useEffect(() => {
		refreshCacheCount()
	}, [refreshCacheCount])

	// playback, mute and the feedback sounds
	const audio = useAudio(refreshCacheCount)

	// user settings (theme + interface language + display mode + which countries to show)
	const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
	useEffect(() => {
		let loaded = loadSettings()

		// URL param for a shareable/deep-linked view:
		//   ?f=sy,iq  -> only these countries are visible
		const params = new URLSearchParams(window.location.search)
		const fParam = params.get('f')
		if (fParam !== null) {
			const want = new Set(fParam.split(',').map(s => s.trim()).filter(Boolean))
			const hiddenCountries = ALL_COUNTRIES.map(c => c.code).filter(c => !want.has(c))
			loaded = { ...loaded, hiddenCountries }
		}

		setSettings(loaded)
		applyTheme(loaded.theme)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// which anthem rendering is played on a card click / as the game prompt
	const [musicType, setMusicType] = useState<MusicType>('instrument')
	// the last clicked country's name, shown in the display segment
	const [shownName, setShownName] = useState('')

	// delete only the downloaded sound files (settings stay); not allowed in flight mode
	const clearSoundCache = useCallback(async () => {
		try {
			await idbClear()
		} catch {
			// ignore
		}
		setCachedCount(0)
	}, [])

	// Flight mode: download the given sounds into the cache, showing the busy state.
	const cacheAudioUrls = useCallback(async (audioUrls: string[]) => {
		setCaching(true)
		try {
			await ensureCached(audioUrls)
		} finally {
			setCaching(false)
			refreshCacheCount()
		}
	}, [refreshCacheCount])

	const updateSettings = (next: Settings) => {
		// stop playback when its country just got hidden — otherwise the sound
		// would keep playing with no card left to stop it
		if (audio.playingCode && next.hiddenCountries.includes(audio.playingCode)) {
			audio.stopSound()
		}

		// flight mode: cache both anthem renderings for every visible country
		const visible = ALL_COUNTRIES.filter(c => !next.hiddenCountries.includes(c.code))
		const urlsFor = (countries: typeof visible) =>
			countries.flatMap(c => MUSIC_TYPES.map(m => `/sound/${m.type}/${c.code}.aac`))
		if (next.flightMode && !settings.flightMode) {
			// just switched on: cache everything currently visible
			cacheAudioUrls(urlsFor(visible))
		} else if (next.flightMode) {
			// already on: cache only the countries that just became visible
			const fresh = visible.filter(c => settings.hiddenCountries.includes(c.code))
			if (fresh.length > 0) {
				cacheAudioUrls(urlsFor(fresh))
			}
		}

		setSettings(next)
		saveSettings(next)
		applyTheme(next.theme)
	}

	const setDisplayMode = (mode: DisplayMode) => updateSettings({ ...settings, displayMode: mode })
	const setUiLanguage = (code: string) => updateSettings({ ...settings, uiLanguage: code as Language })

	// the visible countries, in a stable order (by code); hidden ones are dropped
	const COUNTRIES = ALL_COUNTRIES
		.filter(c => !settings.hiddenCountries.includes(c.code))
		.sort((a, b) => a.code.localeCompare(b.code))

	// the anthem sound file of a country in the selected rendering
	const anthemUrl = (code: string) => `/sound/${musicType}/${code}.aac`

	// the game: recognise the country from its anthem — the cards shuffle each round
	const game = useGame<Country>({
		canPlay: COUNTRIES.length > 0,
		buildBoard: () => shuffle(COUNTRIES),
		promptUrl: c => anthemUrl(c.code),
		preload: async urls => {
			await ensureCached(urls)
			refreshCacheCount()
		},
		audio,
		onRoundStart: () => setShownName(''),
	})

	const board = game.gameOn ? game.board : COUNTRIES
	// the display segment shows the last clicked country's name; during a round it
	// stays blank so the anthem doesn't give the country away
	const displayText = game.gameOn ? '' : shownName

	// UI-string translator, following the interface language chosen in settings
	const t = translator(settings.uiLanguage)
	// lay the cards right-to-left when the interface language is Arabic
	const boardDir = settings.uiLanguage === 'ar' ? 'rtl' : 'ltr'

	// what a card shows: the flag emoji, or the country name in the UI language
	const cardFace = (c: Country) =>
		settings.displayMode === 'flag' ? c.flag : c.name[settings.uiLanguage]

	// shrink the display font before falling back to the marquee
	const displayRef = useFitText(displayText)

	return (
		<div className="Anthem">
			{/* the app bar's four segments sit right-to-left: toolbar, display,
			    game score, game actions (the last two only in game mode) */}
			<header className="app-bar">
				<div className="toolbar">
					<button
						className={(game.gameOn ? 'game-toggle on' : 'game-toggle') + (game.preparing ? ' busy' : '')}
						aria-label={game.gameOn ? t('game.end') : t('game.start')}
						aria-pressed={game.gameOn}
						title={
							game.gameOn
								? t('game.end')
								: (game.canPlay ? t('game.start') : t('game.selectToPlay'))
						}
						disabled={(!game.gameOn && !game.canPlay) || game.preparing}
						onClick={() => (game.gameOn ? game.exitGame() : game.startRound())}
					>
						🕹️
					</button>
					<button
						className={audio.muted ? 'mute-toggle on' : 'mute-toggle'}
						aria-label={audio.muted ? t('mute.unmute') : t('mute.mute')}
						aria-pressed={audio.muted}
						title={audio.muted ? t('mute.unmuteTitle') : t('mute.muteTitle')}
						onClick={audio.toggleMute}
					>
						{audio.muted ? '🔇' : '🔊'}
					</button>
					<select
						className="language-select"
						title={t('music.title')}
						aria-label={t('music.title')}
						value={musicType}
						disabled={game.target !== null}
						onChange={(e) => {
							setMusicType(e.target.value as MusicType)
							setShownName('')
							audio.stopSound()
						}}
					>
						{MUSIC_TYPES.map(m => (
							<option key={`music-${m.type}`} value={m.type}>{m.icon} {t(m.key)}</option>
						))}
					</select>
					<SettingsPanel
						settings={settings}
						countries={ALL_COUNTRIES.map(c => ({ code: c.code, flag: c.flag }))}
						caching={caching}
						cachedCount={cachedCount}
						locked={game.gameOn}
						t={t}
						uiLanguage={settings.uiLanguage}
						uiLanguages={UI_LANGUAGES}
						onSetUiLanguage={setUiLanguage}
						onSetDisplayMode={setDisplayMode}
						onChange={updateSettings}
						onClearCache={clearSoundCache}
					/>
				</div>
				<div className="display">
					<h1 className="display-text" ref={displayRef}>
						{game.preparing ? '⏳' : displayText}
					</h1>
				</div>
				{game.gameOn && (
					<GameScore
						t={t}
						played={game.solved.length}
						total={game.board.length}
						mistakes={game.mistakes}
						giveUps={game.giveUps}
						ms={game.elapsedMs}
					/>
				)}
				{game.gameOn && (
					<GameActions
						t={t}
						roundActive={game.target !== null}
						muted={audio.muted}
						preparing={game.preparing}
						onReplay={game.replay}
						onGiveUp={game.giveUp}
						onStop={game.stopRound}
						onRestart={game.startRound}
					/>
				)}
			</header>
			<hgroup dir={boardDir}>
				{board.map(c => {
					const isGivenUp = game.gameOn && game.gaveUpCodes.includes(c.code)
					const isSolved = game.gameOn && game.solved.includes(c.code) && !isGivenUp
					const isWrong = game.gameOn && game.wrongGuesses.includes(c.code)
					return (
						<button
							key={`country-${c.code}`}
							className={'button-flag'
								+ (settings.displayMode === 'name' ? ' as-name' : '')
								+ (audio.playingCode === c.code ? ' playing' : '')
								+ (isWrong ? ' wrong' : '')}
							title={game.gameOn ? '' : c.name[settings.uiLanguage]}
							disabled={isSolved || isGivenUp || isWrong}
							onClick={() => {
								if (game.gameOn) {
									game.guess(c.code)
								} else if (audio.playingCode === c.code) {
									audio.stopSound()
								} else {
									audio.play(anthemUrl(c.code), c.code)
									setShownName(c.name[settings.uiLanguage])
								}
							}}
						>
							<span className="card-face">{cardFace(c)}</span>
							{audio.playingCode === c.code && <span className="play-icon">▶</span>}
							{isSolved && <span className="swatch-mark">👍</span>}
							{isGivenUp && <span className="swatch-mark">🤷‍♂️</span>}
							{isWrong && <span className="swatch-mark">👎</span>}
						</button>
					)
				})}
			</hgroup>
			{game.feedback && (
				<div key={game.feedback.id} className="game-feedback" aria-hidden="true">
					{game.feedback.emoji}
				</div>
			)}
			<Analytics/>
		</div>
	)
}

export default App
