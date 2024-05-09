'use client'
import SetupAccountForm from '@/components/SetupAccountForm'
import BackButton from '@/components/common/ui/BackButton'
import ProgressBar from '@/components/common/ui/ProgressBar'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import React from 'react'

function SetupAccount() {

  const { createQueryStringAndPush, searchParams } = useCreateQueryString()
  const activeStage = searchParams.get('stage') || 'one'

  const handleNextStage = () => {
    if (activeStage === 'one') createQueryStringAndPush('stage', 'two')
    else if (activeStage === 'two') createQueryStringAndPush('stage', 'three')
  }

  const handlePreviousStage = () => {
    if (activeStage === 'two') createQueryStringAndPush('stage', 'one')
    else if (activeStage === 'three') createQueryStringAndPush('stage', 'two')
  }

  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {activeStage != 'one' && <BackButton onClick={handlePreviousStage} />}
      {/* SIGN IN HEADER */}
      <h1 className='text-[40px] font-serif font-semibold'>Set up your account</h1>

      {/* SIGN IN OPTIONS */}
      <div className='flex tabs gap-2 w-full px-10' role='progress-bars'>
        <ProgressBar value={100} />
        <ProgressBar value={activeStage != 'one' ? 100 : 0} />
        <ProgressBar value={activeStage == 'three' ? 100 : 0} />
      </div>

      <div className='flex flex-col gap-6 w-full px-10'>
        {/* SIGN IN INPUT */}
        <SetupAccountForm activeStage={activeStage} />

        {/* SIGN UP LINK */}
        <div className='flex flex-col gap-3 w-full items-center'>
          <button
            className='btn w-full rounded-[40px] bg-secondary border-0 text-white hover:bg-primary'
            onClick={handleNextStage}
          >
            {activeStage !== 'three' ? 'Continue' : 'Verify'}
            {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}

          </button>
          <p className='text-black font-semibold text-center'>By verifying your account, you agree
            to the <span className='text-primary'>Terms of Service and Privacy Policy</span></p>
        </div>
      </div>

    </div >
  )
}

export default SetupAccount