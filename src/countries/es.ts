import { Country } from './Country'

export const es: Country = {
	code: 'es',
	name: {
		en: 'Spain',
		ar: 'إسبانيا',
		de: 'Spanien',
		el: 'Ισπανία',
		sv: 'Spanien',
		th: 'สเปน',
		tr: 'İspanya',
	},
	flag: '🇪🇸',
	nativeLanguage: 'es',
	anthem: {
		nativeName: 'La Marcha Real',
		name: {
			en: 'The Royal March',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
