'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { Link } from '@/i18n/navigation'
import React from 'react'
import { useTranslations } from 'next-intl'

function PhoneEmailTab() {
    const { createQueryString, searchParams } = useCreateQueryString()
    const t = useTranslations('Auth')
    return (
        <div className='flex tabs gap-4 w-full md:px-10 md:text-md text-sm' role='tablist'>
            <Link href={createQueryString('by', 'phone') as any}
                className={`w-1/2 p-2 text-center ${searchParams.get('by') !== 'email' && 'text-primary border-b-2 border-primary'}`}
            >
                {t('via_phone_number')}
            </Link>
            <Link href={createQueryString('by', 'email') as any}
                className={`w-1/2 p-2 text-center ${searchParams.get('by') === 'email' && 'text-primary border-b-2 border-primary'}`}
            >
                {t('via_email')}
            </Link>
        </div>
    )
}

export default PhoneEmailTab