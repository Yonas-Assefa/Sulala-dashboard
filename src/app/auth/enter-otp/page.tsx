import OTPInput from '@/components/OTPInput'
import React, { ElementRef, useEffect } from 'react'
import EnterOtpForm from './EnterOtpForm'
import { redirect } from 'next/navigation'

type Props = {
    searchParams: {
        phone: string,
        action: string
    }
}

function EnterOTP({ searchParams: { phone: rawPhone, action } }: Props) {
    const phone = '+' + rawPhone.trim().replace('+', '')
    console.log({ phone })

    if (!phone) return redirect('/auth/sign-in')

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
                    <span className='text-primary font-semibold'>{phone}</span>
                </p>
                <EnterOtpForm phone={phone} action={action} />
            </div>
        </div >
    )
}

export default EnterOTP