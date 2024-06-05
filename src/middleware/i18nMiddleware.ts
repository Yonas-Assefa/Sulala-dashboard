
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';
import createMiddleware from 'next-intl/middleware';

const i18nMiddleware = createMiddleware({
    locales: LOCALES,

    defaultLocale: DEFAULT_LOCALE,
});

export { i18nMiddleware };