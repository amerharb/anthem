import { Country } from './Country'

export const eg: Country = {
	code: 'eg',
	name: {
		en: 'Egypt',
		ar: 'مصر',
		el: 'Αίγυπτος',
		sv: 'Egypten',
		tr: 'Mısır',
		th: 'อียิปต์',
	},
	flag: '🇪🇬',
	nativeLanguage: 'ar',
	anthem: {
		nativeName: 'بلادي بلادي بلادي',
		name: {
			en: 'My Homeland, My Homeland, My Homeland',
		},
	},
	// added in bulk from the Flags project: the recording is in place, but the
	// intro point and the 🎼 melody still need doing
	beta: true,
}
