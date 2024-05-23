'use client'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    email: string
  }
}

function SetupComplete({ searchParams: { email } }: Props) {

  if (!email) notFound()

  return (
    <div className='text-black w-9/12 flex flex-col gap-5 items-center'>
      {/* SIGN IN HEADER */}
      <h1 className='text-[50px] font-serif font-semibold self-start'>Thank you!</h1>

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