import { Country } from './Country'

export const ir: Country = {
	code: 'ir',
	name: {
		en: 'Iran',
		ar: 'إيران',
		el: 'Ιράν',
		sv: 'Iran',
		tr: 'İran',
		th: 'อิหร่าน',
	},
	flag: '🇮🇷',
	nativeLanguage: 'fa',
	anthem: {
		nativeName: 'سرود ملی جمهوری اسلامی ایران',
		name: {
			en: 'National Anthem of the Islamic Republic of Iran',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
