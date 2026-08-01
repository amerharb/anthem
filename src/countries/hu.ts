import { Country } from './Country'

export const hu: Country = {
	code: 'hu',
	name: {
		en: 'Hungary',
		ar: 'المجر',
		el: 'Ουγγαρία',
		sv: 'Ungern',
		tr: 'Macaristan',
		th: 'ฮังการี',
	},
	flag: '🇭🇺',
	nativeLanguage: 'hu',
	anthem: {
		nativeName: 'Himnusz',
		name: {
			en: 'Hymn',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
