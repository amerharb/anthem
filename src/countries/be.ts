import { Country } from './Country'

export const be: Country = {
	code: 'be',
	name: {
		en: 'Belgium',
		ar: 'بلجيكا',
		de: 'Belgien',
		el: 'Βέλγιο',
		sv: 'Belgien',
		th: 'เบลเยียม',
		tr: 'Belçika',
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
