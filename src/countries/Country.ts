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
			hasDistinctIntro: boolean,
			composed?: string, // ISO date 'yyyy-mm-dd', 'yyyy-mm' or 'yyyy'
			adopted?: string, // ISO date 'yyyy-mm-dd', 'yyyy-mm' or 'yyyy' some countries have no adoption day
		},
    // when true, only shown in development / beta builds, hidden in production
    beta?: boolean,
}
