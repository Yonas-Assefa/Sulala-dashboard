'use client';
import { getPersonalInfo } from '@/actions/settings/get-personal-info';
import BackButton from '@/components/common/ui/BackButton'
import Counter from '@/components/common/ui/Counter';
import { Metadata } from 'next';
import { redirect, useRouter } from '@/i18n/navigation';
import React, { useEffect } from 'react'
import { isMobile } from 'mobile-device-detect';
import { useTranslations } from 'next-intl'

// export const metadata: Metadata = {
//     title: 'Sulala | Auth Confirmation Letter',
//     description: 'Confirm your email address to get started with Sulala.',
//     icons: [
//         '/sulala-logo.svg',
//     ]
// };

type Props = {
    searchParams: {
        email: string
    }
}

function ConfirmationLetter({ searchParams: { email } }: Props) {
    const router = useRouter()
    const t = useTranslations('Auth')
    // TEMP
    // useEffect(() => {
    //     if (!isMobile) {
    //         router.push('/auth/create-password')
    //     }
    // }, [])

    return (
        <div className='text-black w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center'>
            <div className='flex w-full'>
                <BackButton />
            </div>
            {/* SIGN IN HEADER */}
            <div className='flex flex-col gap-6'>
                <p className='text-gray-500'>{t('check_your_computer')}</p>
                <div className='flex flex-col gap-3 w-full'>
                    {/* SIGN UP LINK */}
                    <div className='flex flex-col gap-3 w-full items-center'>
                        <img src="/icons/pc.svg" alt="" className='w-[200px]' />
                    </div>
                    <div className='w-full flex justify-center flex-row'>
                        <button className='flex flex-row gap-3 text-primary' onClick={() => {
                            router.push('/auth/create-password')
                        }}>
                            <img src="/icons/phone.svg" alt="" />
                            <p>{t('proceed_with_phone')}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmationLetter