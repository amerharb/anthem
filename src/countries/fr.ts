import { Country } from './Country'

export const fr: Country = {
	code: 'fr',
	name: {
		en: 'France',
		ar: 'فرنسا',
		el: 'Γαλλία',
		sv: 'Frankrike',
		tr: 'Fransa',
		th: 'ฝรั่งเศส',
	},
	flag: '🇫🇷',
	nativeLanguage: 'fr',
	anthem: {
		nativeName: 'La Marseillaise',
		name: {
			en: 'The Marseillaise',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
