'use client'
import OTPInput from '@/components/OTPInput'
import SignInWithEmail from '@/components/SignInWithEmail'
import SignInWithPhone from '@/components/SignInWithPhone'
import React, { ElementRef, useEffect } from 'react'

function EnterOTP() {
    const submitBtn = React.useRef<ElementRef<'button'>>(null)
    const [counter, setCounter] = React.useState(30)

    useEffect(() => {
        const interval = setInterval(() => {
            counter > 0 ? setCounter(counter - 1) : clearInterval(interval)
        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <div className='text-black w-10/12 h-3/5 px-6 flex flex-col justify-evenly gap-5 items-center'>
            {/* BACK BUTTON */}
            <div className='flex w-full mb-4'>
                <button className='bg-tertiary hover:bg-primary/20 p-2 rounded-full btn border-0'>
                    <img src="/icons/arrow-left.svg" alt="" className='w-[30px]' />
                </button>
            </div>
            {/* SIGN IN HEADER */}
            <div className='flex flex-col gap-3'>
                <h1 className='text-[40px] font-serif font-semibold self-start'>Enter code</h1>
                <p className='text-gray-500'>We send a verification code on the following phone number: &nbsp;
                    <span className='text-primary font-semibold'>+965 654 32 10</span>
                </p>
                <div className='flex flex-col gap-6 w-full'>
                    {/* OTP IN INPUT */}
                    <OTPInput submitBtn={submitBtn} />
                    {/* SIGN UP LINK */}
                    <div className='flex flex-col gap-3 w-full items-center'>
                        {counter > 0 ?
                            <p className='text-[#70757f]'>Send new code in 00:{counter}</p> :
                            <button className='text-primary font-semibold btn bg-transparent focus:bg-transparent hover:bg-transparent border-0 shadow-none'>Send new code</button>}
                        <button
                            className='btn w-full rounded-[40px] bg-secondary border-0 text-white hover:bg-primary focus:bg-primary'
                            ref={submitBtn}>
                            Confirm
                            {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EnterOTP