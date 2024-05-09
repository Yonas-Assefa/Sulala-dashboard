import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import { SignupProps } from '@/types/props.type'
import Link from 'next/link'
import React from 'react'
import PhoneEmailTab from '../components/PhoneEmailTab'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { signIn } from '@/app/actions'

function SignIn({ searchParams: { by } }: SignupProps) {

  return (
    <div className='text-black w-10/12 flex flex-col gap-5 items-center'>
      {/* SIGN IN HEADER */}
      <h1 className='text-[50px] font-serif font-semibold'>Sign in</h1>

      {/* SIGN IN OPTIONS */}
      <PhoneEmailTab />

      <form action={signIn} className='flex flex-col gap-6 w-full px-10'>
        {/* SIGN IN INPUT */}
        {by !== 'email' ?
          <SignInWithPhone /> :
          <SignInWithEmail />}

        {/* SIGN UP LINK */}
        <div className='flex flex-col gap-3 w-full items-center'>
          <div className='w-full flex flex-col'>
            <PrimaryButton name='Sign in' />
          </div>

          <p className='text-[#70757f] select-none'>Don't have an account?</p>
          <SecondaryButton name='Sign up' href={'/auth/sign-up'} />
        </div>
      </form>


      <div className="divider"></div>

      {/* SOCIAL SIGN UP */}
      <div className='flex gap-4'>
        <button className='btn border-0 h-100px aspect-square bg-[#f6f6f6] rounded-full hover:bg-primary/20'><img src="/applelogo.svg" alt="" /></button>
        <button className='btn border-0 h-100px aspect-square bg-[#f6f6f6] rounded-full hover:bg-primary/20'><img src="/googlelogo.svg" alt="" /></button>
      </div>
    </div >
  )
}

export default SignIn