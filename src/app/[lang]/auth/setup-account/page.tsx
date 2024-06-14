import { getCategories } from '@/actions/common/get-categories'
import SetupAccountForm from './SetupAccountForm'
import BackButton from '@/components/common/ui/BackButton'
import ProgressBar from '@/components/common/ui/ProgressBar'
import React from 'react'
import { Metadata } from 'next'
import { getPersonalInfo } from '@/actions/settings/get-personal-info'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Sulala | Auth Setup Account',
  description: 'Setup your Sulala account to start buying and selling goods and services.',
  icons: [
    '/sulala-logo.svg',
  ]
};

type Props = {
  searchParams: {
    stage: string
  }
}
async function SetupAccount({ searchParams: { stage: activeStage } }: Props) {

  const categoryLists = await getCategories()
  const personalInfo = await getPersonalInfo()

  const t = await getTranslations('Auth')
  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {activeStage != 'one' && <BackButton />}
      {/* SIGN IN HEADER */}
      <h1 className='text-3xl text-center md:text-[40px] md:py-2 font-serif font-semibold'>{t('setup_your_account')}</h1>

      {/* SIGN IN OPTIONS */}
      <div className='flex tabs gap-2 w-full md:px-10' role='progress-bars'>
        <ProgressBar value={100} />
        <ProgressBar value={activeStage != 'one' ? 100 : 0} />
        <ProgressBar value={activeStage == 'three' ? 100 : 0} />
      </div>

      <div className='flex flex-col gap-6 w-full md:px-10'>
        {/* SIGN IN INPUT */}
        <SetupAccountForm personalInfo={personalInfo} activeStage={activeStage} categoryLists={categoryLists} />
      </div>

    </div >
  )
}

export default SetupAccount