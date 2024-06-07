import React from 'react'
import { getTranslations } from 'next-intl/server'

type Props = {
  searchParams: {
    vendor_id: string
    approval_token: string
  }

}

async function UnAuthorized({ searchParams: { approval_token, vendor_id } }: Props) {

  const t = await getTranslations('Auth')


  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {/* UNAUTHORIZED HEADER */}
      <h1 className='text-[30px] text-primary font-serif font-semibold'>{t('unauthorized_title')}</h1>


      <div className='flex'>
        <img src="/icons/shield-off.svg" alt="alert" />
      </div>
      <p className='text-danger'>{t('unauthorized_description')}</p>
    </div >
  )
}

export default UnAuthorized;