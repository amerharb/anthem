import { Country } from './Country'

export const pl: Country = {
	code: 'pl',
	name: {
		en: 'Poland',
		ar: 'بولندا',
		el: 'Πολωνία',
		sv: 'Polen',
		tr: 'Polonya',
		th: 'โปแลนด์',
	},
	flag: '🇵🇱',
	nativeLanguage: 'pl',
	anthem: {
		nativeName: 'Mazurek Dąbrowskiego',
		name: {
			en: 'Dąbrowski\'s Mazurka',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
