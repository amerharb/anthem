import { Country } from './Country'

export const va: Country = {
	code: 'va',
	name: {
		en: 'Vatican City',
		ar: 'الفاتيكان',
		el: 'Βατικανό',
		sv: 'Vatikanstaten',
		tr: 'Vatikan',
		th: 'นครวาติกัน',
	},
	flag: '🇻🇦',
	nativeLanguage: 'la',
	anthem: {
		nativeName: 'Inno e Marcia Pontificale',
		name: {
			en: 'Pontifical Anthem and March',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
