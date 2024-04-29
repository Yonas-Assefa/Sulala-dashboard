'use client'
import CreatePasswordForm from '@/components/CreatePasswordForm'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import React, { ElementRef } from 'react'

function CreatePassword() {

  return (
    <div className='text-black w-10/12 flex flex-col gap-8 items-center'>
      {/* CREATE PASSWORD HEADER */}
      <h1 className='text-[40px] font-serif font-semibold'>Create Password</h1>

      <div className='flex flex-col gap-6 w-full px-10'>
        {/* SIGN IN INPUT */}
        <CreatePasswordForm />

        {/* SIGN UP LINK */}
        <div className='flex flex-col gap-3 w-full items-center'>
          <button className='btn w-full rounded-[40px] bg-secondary border-0 text-white hover:bg-primary'>
            Sign in
            {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}

          </button>
        </div>
      </div>
    </div >
  )
}

export default CreatePassword