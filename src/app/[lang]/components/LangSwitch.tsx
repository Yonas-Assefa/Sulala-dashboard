'use client'
import { LOCALES } from '@/i18n/config'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

function LangSwitch() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { lang } = useParams()
    const router = useRouter()

    const handleLangChange = () => {
        router.push(pathname + '?' + searchParams.toString() as any, { locale: lang == 'en' ? 'ar' : 'en' });
    };
    return (
        <button className="swap bg-white hover:bg-primary text-primary hover:text-white rounded-lg p-2 aspect-square" onClick={handleLangChange}>
            {
                LOCALES.map((locale) => (
                    <div className={`uppercase ${lang == locale ? 'swap-on' : 'swap-off'}`}>{locale}</div>
                ))
            }
        </button>
    )
}

export default LangSwitch