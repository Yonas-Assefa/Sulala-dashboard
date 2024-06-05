import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from './i18n/config';
import { notFound } from 'next/navigation';

const locales = LOCALES as string[];

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});