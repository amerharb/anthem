// 'en' and 'ar' are the interface languages; they also key each country's
// display name (shown on a card when the display mode is "name").
export type Language = 'en' | 'ar'

// The language the anthem itself is sung in (ISO 639-1). Separate from the
// interface languages above — most anthems are in neither of them. Add a code
// here as countries are added.
export type NativeLanguage = 'ar' | 'en' | 'el' | 'sv' | 'th' | 'tr'

export type Country = {
    code: string,
    name: Record<Language, string>,
    flag: string,
		nativeLanguage: NativeLanguage,
    anthem: {
			nativeName: string,
			name: Record<Language, string>,
			// where the anthem's intro ends, in seconds into the recording. The one
			// recording covers every instrumental rendering: 🥁 intro plays 0 → intro,
			// 🎺 instrument plays intro → end, 🥁🎺 plays the whole file.
			// 0 or absent means the anthem has no distinct intro.
			intro?: number,
			// true when a sung (vocal, native-language) recording is available
			hasVocal?: boolean,
			// the melody as notes, synthesized live in the browser instead of
			// streaming a recording (see src/synth.ts for the format)
			score?: { tempo: number, melody: string },
			composed?: string, // ISO date 'yyyy-mm-dd', 'yyyy-mm' or 'yyyy'
			adopted?: string, // ISO date 'yyyy-mm-dd', 'yyyy-mm' or 'yyyy' some countries have no adoption day
		},
    // when true, only shown in development / beta builds, hidden in production
    beta?: boolean,
}
