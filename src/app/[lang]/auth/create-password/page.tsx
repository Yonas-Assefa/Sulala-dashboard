import { getPersonalInfo } from '@/actions/settings/get-personal-info'
import CreatePasswordForm from './CreatePasswordForm'
import React from 'react'
import { redirect } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

async function CreatePassword() {

  const isError = (val: unknown): val is Error => {
    if (val && typeof val == 'object' && 'message' in val && typeof val.message == 'string') return true
    return false
  }

  const t = await getTranslations('Auth')

  // TEMP
  // try {
  //   const personalInfo = await getPersonalInfo()
  //   if (personalInfo?.is_password_set) {
  //     redirect('/dashboard/settings')
  //   }
  // } catch (error: unknown) {
  //   if (isError(error) && error.message.includes('An authentication token is not provided or invalid')) {
  //     redirect('/auth/sign-in')
  //   }
  // }

  return (
    <div className='text-black w-10/12 flex flex-col gap-8 items-center'>
      {/* CREATE PASSWORD HEADER */}
      <h1 className='text-3xl md:text-[40px] font-serif font-semibold text-center'>{t('create_password')}</h1>

      <CreatePasswordForm />
    </div >
  )
}

export default CreatePassword