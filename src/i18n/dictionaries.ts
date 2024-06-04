// import 'server-only'

const dictionaries = {
    en: () => import('./locale/en.json').then((module) => module.default),
    ar: () => import('./locale/ar.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => dictionaries[locale as keyof typeof dictionaries]()