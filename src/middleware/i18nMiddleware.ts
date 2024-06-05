import { LOCALES } from '@/i18n/config';
import createMiddleware from 'next-intl/middleware';

const i18nMiddleware = createMiddleware({
    locales: LOCALES,

    defaultLocale: 'ar'
});

export { i18nMiddleware }