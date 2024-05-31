'use client'
import { acceptApproval } from '@/actions/auth/accept-approval'
import { getPersonalInfo } from '@/actions/settings/get-personal-info'
import pushNotification from '@/utils/pushNotification.util'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    vendor_id: string
    approval_token: string
  }

}

async function VerifyEmail({ searchParams: { approval_token, vendor_id } }: Props) {

  // const checkEmailVerification = async () => {
  //   const personalInfo = await getPersonalInfo()
  //   if (!personalInfo?.email_verified && pathname !== '/auth/verify-email') {
  //     redirect('/auth/verify-email')
  //   } else if (!personalInfo?.is_password_set && personalInfo?.email && !personalInfo?.phone_verified && pathname !== '/auth/create-password') {
  //     redirect('/auth/create-password')
  //   } else if (personalInfo.shops && Array.isArray(personalInfo.shops) && personalInfo.shops.length > 0 && !pathname.includes('dashboard')) {
  //     redirect('/dashboard/settings')
  //   } else if (!pathname.includes('auth/setup-account')) {
  //     redirect('/auth/setup-account?stage=one')
  //   }
  // }
  const router = useRouter()

  const parseFormState = async () => {
    const formState = await acceptApproval({ approval_token, vendor_id })
    if (formState.status === 'SUCCESS') {
      pushNotification(formState.message, 'success')
      if (formState.redirectUrl) {
        router.push(formState.redirectUrl)
      }
    } else {
      pushNotification(formState.message, 'error')
      router.push('/auth/sign-in')
    }
  }

  React.useEffect(() => {
    if (!approval_token || !vendor_id) {
      pushNotification('Invalid link', 'error')
      redirect('/auth/sign-in')
    }
    parseFormState()
  }, [])


  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {/* SIGN IN HEADER */}
      <h1 className='text-[30px] font-serif font-semibold'>You shop has been approved!</h1>


      <div className='flex'>
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
      <p>Please hold tight!</p>
    </div >
  )
}

export default VerifyEmail