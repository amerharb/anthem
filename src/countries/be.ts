import { Country } from './Country'

export const be: Country = {
	code: 'be',
	name: {
		en: 'Belgium',
		ar: 'بلجيكا',
		el: 'Βέλγιο',
		sv: 'Belgien',
		tr: 'Belçika',
		th: 'เบลเยียม',
	},
	flag: '🇧🇪',
	nativeLanguage: 'nl',
	anthem: {
		nativeName: 'La Brabançonne',
		name: {
			en: 'The Brabantian',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
