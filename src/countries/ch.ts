import { Country } from './Country'

export const ch: Country = {
	code: 'ch',
	name: {
		en: 'Switzerland',
		ar: 'سويسرا',
		de: 'Schweiz',
		el: 'Ελβετία',
		sv: 'Schweiz',
		th: 'สวิตเซอร์แลนด์',
		tr: 'İsviçre',
	},
	flag: '🇨🇭',
	nativeLanguage: 'de',
	anthem: {
		nativeName: 'Schweizerpsalm',
		name: {
			en: 'Swiss Psalm',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
