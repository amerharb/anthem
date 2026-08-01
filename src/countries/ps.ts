import { Country } from './Country'

export const ps: Country = {
	code: 'ps',
	name: {
		en: 'Palestine',
		ar: 'فلسطين',
		el: 'Παλαιστίνη',
		sv: 'Palestina',
		tr: 'Filistin',
		th: 'ปาเลสไตน์',
	},
	flag: '🇵🇸',
	nativeLanguage: 'ar',
	anthem: {
		nativeName: 'فدائي',
		name: {
			en: 'Warrior',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
