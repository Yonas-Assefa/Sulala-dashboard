'use client'
import { clearCookie } from '@/actions/common/clear-cookie'
import { useCounterStore } from '@/providers/setup-account-store-provider'
import { notFound, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    email: string
  }
}

function SetupComplete({ searchParams: { email } }: Props) {

  if (!email) notFound()
  React.useEffect(() => {
    clearCookie()
  }, [])

  return (
    <div className='text-black w-11/12 md:w-9/12 flex flex-col gap-6 items-center'>
      {/* SIGN IN HEADER */}
      <h1 className='text-3xl md:text-[40px] font-serif font-semibold self-start'>Thank you!</h1>

      <div className=''>
        <p>
          The notification about passing moderation on the platform will be sent to
          &nbsp; <span className='text-primary font-semibold'>{email}.</span>
          &nbsp; <span className='text-primary font-semibold'>It could take up to 48 hours.</span>
        </p>
      </div>

    </div >
  )
}

export default SetupComplete