import { Country } from './Country'

export const at: Country = {
	code: 'at',
	name: {
		en: 'Austria',
		ar: 'النمسا',
		de: 'Österreich',
		el: 'Αυστρία',
		sv: 'Österrike',
		th: 'ออสเตรีย',
		tr: 'Avusturya',
	},
	flag: '🇦🇹',
	nativeLanguage: 'de',
	anthem: {
		nativeName: 'Land der Berge, Land am Strome',
		name: {
			en: 'Land of Mountains, Land by the River',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
