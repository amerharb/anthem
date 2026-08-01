import { Country } from './Country'

export const it: Country = {
	code: 'it',
	name: {
		en: 'Italy',
		ar: 'إيطاليا',
		el: 'Ιταλία',
		sv: 'Italien',
		tr: 'İtalya',
		th: 'อิตาลี',
	},
	flag: '🇮🇹',
	nativeLanguage: 'it',
	anthem: {
		nativeName: 'Il Canto degli Italiani',
		name: {
			en: 'The Song of the Italians',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
