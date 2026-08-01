import { Country } from './Country'

export const va: Country = {
	code: 'va',
	name: {
		en: 'Vatican City',
		ar: 'الفاتيكان',
		de: 'Vatikanstadt',
		el: 'Βατικανό',
		sv: 'Vatikanstaten',
		th: 'นครวาติกัน',
		tr: 'Vatikan',
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
