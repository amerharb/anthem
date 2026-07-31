import { Country } from './Country'

export const us: Country = {
	code: 'us',
	name: {
		en: 'United States of America',
		ar: 'الولايات المتحدة الأمريكية',
	},
	flag: '🇺🇸',
	nativeLanguage: 'en',
	anthem: {
		nativeName: 'The Star-Spangled Banner',
		name: {
			en: 'The Star-Spangled Banner',
			ar: 'الراية المرصعة بالنجوم',
		},
		hasTonal: true,
		// the tune (To Anacreon in Heaven) is older, c. 1773; 1814 is when Francis
		// Scott Key's words were set to it and the song as we know it appeared
		composed: '1814',
		adopted: '1931-03-03',
	},
}
