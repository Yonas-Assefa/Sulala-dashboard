import { useTranslations } from 'next-intl'
import React from 'react'

function SulalaLogo() {
  const t = useTranslations('Commons')
  return (
    <div className='text-black md:p-5 p-2 flex items-center gap-3 self-start'>
      <img src='/sulala-logo.svg' className='md:w-[40px] w-[30px]' />
      <h2 className='text-[#0F5D31] font-bold font-serif text-[25px]'>{t('sulala')}</h2>
    </div>
  )
}

export default SulalaLogo