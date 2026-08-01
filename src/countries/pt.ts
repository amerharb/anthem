import { Country } from './Country'

export const pt: Country = {
	code: 'pt',
	name: {
		en: 'Portugal',
		ar: 'البرتغال',
		el: 'Πορτογαλία',
		sv: 'Portugal',
		tr: 'Portekiz',
		th: 'โปรตุเกส',
	},
	flag: '🇵🇹',
	nativeLanguage: 'pt',
	anthem: {
		nativeName: 'A Portuguesa',
		name: {
			en: 'The Portuguese',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
