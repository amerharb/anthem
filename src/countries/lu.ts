import { Country } from './Country'

export const lu: Country = {
	code: 'lu',
	name: {
		en: 'Luxembourg',
		ar: 'لوكسمبورغ',
		el: 'Λουξεμβούργο',
		sv: 'Luxemburg',
		tr: 'Lüksemburg',
		th: 'ลักเซมเบิร์ก',
	},
	flag: '🇱🇺',
	nativeLanguage: 'lb',
	anthem: {
		nativeName: 'Ons Heemecht',
		name: {
			en: 'Our Homeland',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
