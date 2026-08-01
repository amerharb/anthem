import { Country } from './Country'

export const al: Country = {
	code: 'al',
	name: {
		en: 'Albania',
		ar: 'ألبانيا',
		de: 'Albanien',
		el: 'Αλβανία',
		sv: 'Albanien',
		th: 'แอลเบเนีย',
		tr: 'Arnavutluk',
		zh: '阿尔巴尼亚',
	},
	flag: '🇦🇱',
	nativeLanguage: 'sq',
	anthem: {
		nativeName: 'Himni i Flamurit',
		name: {
			en: 'Hymn to the Flag',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
