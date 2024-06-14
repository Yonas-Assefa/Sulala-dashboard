'use client'
import { closeModal } from '@/lib/modals'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {
    isPending?: boolean
}

function ResendVerificationModal({ isPending }: Props) {

    const handleClickOutside = () => {
        closeModal('resend_email_verification_link', true)
    }

    const t = useTranslations('Auth')

    return (
        <dialog id="resend_email_verification_link" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">{t('resend_verification_title')}</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <p className='text-center text-black'>{t('resend_verification_description')}</p>
                    <button
                        className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
                        type='button'
                        id={'resend_email_verification_link_confirm'}
                        name={'resend_email_verification_link_confirm'}
                    >
                        {isPending ? <span className="loading loading-spinner loading-md text-primary"></span> : t('yes')}
                    </button>
                    <button
                        type='button'
                        className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black "
                        id={'resend_email_verification_link_cancel'}
                        name={'resend_email_verification_link_cancel'}
                    >
                        {t('cancel')}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={handleClickOutside}>
            </div>
        </dialog>
    )
}

export default ResendVerificationModal