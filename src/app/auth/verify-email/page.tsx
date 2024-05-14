'use client'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { verifyEmail } from '@/services/api.service'
import { validateVerifyEmail } from '@/services/validate.service'
import { TVerifyEmail } from '@/types/api-service.type'
import { FormState } from '@/utils/formStateHelper'
import pushNotification from '@/utils/pushNotification.util'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    vendor_id: string
    confirmation_token: string
  }

}

async function VerifyEmail({ searchParams: { confirmation_token, vendor_id } }: Props) {

  const { onSubmit: parseFormState } = useFormSubmit<TVerifyEmail>({
    Fn: verifyEmail,
    Opt: {
      successRedirectUrl: '/dashboard/settings',
      failureRedirectUrl: ({ error }) => error?.message === 'Email already verified' ?
        '/dashboard/settings' : '/auth/sign-up',
      successMessage: 'Email verified successfully!',
      failureMessage: 'Failed to verify email'
    },
    validate: validateVerifyEmail
  })

  React.useEffect(() => {
    const formData = new FormData()
    formData.append('confirmation_token', confirmation_token)
    formData.append('vendor_id', vendor_id)
    parseFormState(formData)
  }, [])


  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {/* SIGN IN HEADER */}
      <h1 className='text-[30px] font-serif font-semibold'>Verifying email</h1>


      <div className='flex'>
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
      <p>Please hold tight!</p>
    </div >
  )
}

export default VerifyEmail