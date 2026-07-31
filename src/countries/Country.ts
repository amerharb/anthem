// 'en' and 'ar' are the interface languages; they also key each country's
// display name (shown on a card when the display mode is "name").
export type Language = 'en' | 'ar'

export type Country = {
    code: string,
    name: Record<Language, string>,
    flag: string,
		nativeLanguage: Language,
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
			// true when a pure-tone (tonal) rendering is available
			hasTonal?: boolean,
			composed?: string, // ISO date 'yyyy-mm-dd', 'yyyy-mm' or 'yyyy'
			adopted?: string, // ISO date 'yyyy-mm-dd', 'yyyy-mm' or 'yyyy' some countries have no adoption day
		},
    // when true, only shown in development / beta builds, hidden in production
    beta?: boolean,
}
