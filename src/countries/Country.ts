// 'en' and 'ar' are the interface languages; they also key each country's
// display name (shown on a card when the display mode is "name").
export type Language = 'en' | 'ar'

export type Country = {
    code: string,
    name: Record<Language, string>,
    flag: string,
    // when true, only shown in development / beta builds, hidden in production
    beta?: boolean,
}
