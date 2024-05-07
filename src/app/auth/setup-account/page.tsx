'use client'
import SetupAccountForm from '@/components/SetupAccountForm'
import BackButton from '@/components/common/ui/BackButton'
import ProgressBar from '@/components/common/ProgressBar'
import React, { ElementRef } from 'react'

function SetupAccount() {

  const [activeStage, setActiveStage] = React.useState<1 | 2 | 3>(1)

  const handleNextStage = () => {
    if (activeStage === 1) setActiveStage(2)
    else if (activeStage === 2) setActiveStage(3)
  }

  const handlePreviousStage = () => {
    if (activeStage === 1) setActiveStage(3)
    else if (activeStage === 2) setActiveStage(1)
    else if (activeStage === 3) setActiveStage(2)
  }

  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {activeStage != 1 && <BackButton onClick={handlePreviousStage} />}
      {/* SIGN IN HEADER */}
      <h1 className='text-[40px] font-serif font-semibold'>Set up your account</h1>

      {/* SIGN IN OPTIONS */}
      <div className='flex tabs gap-2 w-full px-10' role='progress-bars'>
        <ProgressBar value={activeStage >= 1 ? 100 : 0} />
        <ProgressBar value={activeStage >= 2 ? 100 : 0} />
        <ProgressBar value={activeStage >= 3 ? 100 : 0} />
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
            {activeStage !== 3 ? 'Continue' : 'Verify'}
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