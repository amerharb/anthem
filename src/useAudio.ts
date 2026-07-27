/*
 * Sound playback behind one hook: a single shared audio element (starting a new
 * sound stops the current one), the mute toggle (🔊/🔇), the pending next-prompt
 * timer, and the short feedback sounds. Playback reads from the IndexedDB cache
 * (works in Safari Lockdown Mode) and falls back to the network.
 */
import { useCallback, useRef, useState } from 'react'
import { getAudioBlob } from './audioCache'

// short win/lose feedback sounds
function playFx(name: 'correct' | 'wrong' | 'giveup') {
	try {
		new Audio(`/sound/fx/${name}.aac`).play().catch(() => {})
	} catch {
		// ignore
	}
}

// onPlayed is called after an icon-tracked sound starts (playing may have added
// the file to the cache, so the caller can refresh its cache count)
export function useAudio(onPlayed?: () => void) {
	// the sound currently playing, so starting a new one can stop it first
	const playingAudio = useRef<HTMLAudioElement | null>(null)
	// object URLs for the clips of the current (possibly multi-part) playback,
	// kept so they can all be revoked when playback stops
	const seqUrls = useRef<string[]>([])
	// code of the item whose sound is playing, to show the play icon on its button
	const [playingCode, setPlayingCode] = useState<string | null>(null)

	// 🔇: when muted, nothing plays (prompts, names, or feedback sounds).
	// A ref mirrors the state so the audio helpers and pending prompt timers
	// always see the current value.
	const [muted, setMuted] = useState(false)
	const mutedRef = useRef(false)

	// pending "play the next prompt" timer during the game, so it can be cancelled
	// if the game ends (or is stopped) before it fires — otherwise a late timer
	// would start a sound after the game is already over
	const promptTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

	const stopSound = useCallback(() => {
		if (promptTimer.current) {
			clearTimeout(promptTimer.current)
			promptTimer.current = null
		}
		if (playingAudio.current) {
			playingAudio.current.onended = null
			playingAudio.current.pause()
			playingAudio.current = null
		}
		seqUrls.current.forEach(u => URL.revokeObjectURL(u))
		seqUrls.current = []
		setPlayingCode(null)
	}, [])

	// mute toggle (🔊/🔇): muting also silences whatever is playing right now
	const toggleMute = () => {
		const next = !muted
		mutedRef.current = next
		if (next) stopSound()
		setMuted(next)
	}

	// Play a sound, stopping the current one first. A string[] plays the clips
	// back-to-back as one prompt (e.g. a general drum intro then the anthem) —
	// all clips are fetched and primed up front so the join has no gap. With
	// `code` the matching button shows the play icon; game prompts pass none —
	// a ▶ on the target button would reveal the answer.
	const play = useCallback(async (url: string | string[], code?: string) => {
		if (mutedRef.current) return
		const urls = Array.isArray(url) ? url : [url]
		try {
			// fetch every clip's blob first, so the transition never waits on I/O
			const blobs = await Promise.all(urls.map(getAudioBlob))
			const objectUrls = blobs.filter(Boolean).map(b => URL.createObjectURL(b as Blob))
			if (objectUrls.length === 0) return
			// stop and clean up whatever was playing
			if (playingAudio.current) {
				playingAudio.current.onended = null
				playingAudio.current.pause()
			}
			seqUrls.current.forEach(u => URL.revokeObjectURL(u))
			seqUrls.current = objectUrls.slice()
			// pre-create and load all elements so each next clip starts instantly
			const elements = objectUrls.map(u => {
				const a = new Audio(u)
				a.preload = 'auto'
				a.load()
				return a
			})
			let idx = 0
			const step = () => {
				const a = elements[idx]
				playingAudio.current = a
				a.onended = () => {
					URL.revokeObjectURL(objectUrls[idx])
					if (idx + 1 < elements.length) {
						idx += 1
						step()
					} else {
						seqUrls.current = []
						playingAudio.current = null
						if (code !== undefined) setPlayingCode(null)
					}
				}
				a.play().catch(() => {})
			}
			step()
			if (code !== undefined) {
				setPlayingCode(code)
				onPlayed?.()
			}
		} catch (e) {
			console.error(e)
		}
	}, [onPlayed])

	// cancel a not-yet-fired next prompt without stopping the playing sound
	const cancelPrompt = useCallback(() => {
		if (promptTimer.current) {
			clearTimeout(promptTimer.current)
			promptTimer.current = null
		}
	}, [])

	// play a prompt after a delay (lets the game feedback land first);
	// cancelled by stopSound or cancelPrompt
	const schedulePrompt = useCallback((url: string | string[], delayMs: number) => {
		promptTimer.current = setTimeout(() => play(url), delayMs)
	}, [play])

	// feedback sounds respect the mute toggle
	const fx = useCallback((name: 'correct' | 'wrong' | 'giveup') => {
		if (!mutedRef.current) playFx(name)
	}, [])

	return { playingCode, muted, toggleMute, stopSound, play, schedulePrompt, cancelPrompt, fx }
}
