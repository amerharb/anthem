import { Country } from './Country'

export const nl: Country = {
	code: 'nl',
	name: {
		en: 'Netherlands',
		ar: 'هولندا',
		el: 'Ολλανδία',
		sv: 'Nederländerna',
		tr: 'Hollanda',
		th: 'เนเธอร์แลนด์',
	},
	flag: '🇳🇱',
	nativeLanguage: 'nl',
	anthem: {
		nativeName: 'Het Wilhelmus',
		name: {
			en: 'The William',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
