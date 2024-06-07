import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export default async function OpenGraphImage({ params: { lang } }: { params: { lang: string } }) {
    const t = await getTranslations({ lang, namespace: 'OpenGraphImage' });
    return new ImageResponse(<div style={{ fontSize: 128 }}>
        <p>{t('title')}</p>
        <p>{t('description')}</p>
        <img src="/sulala-logo.svg" alt="sulala logo" />
    </div>);
}