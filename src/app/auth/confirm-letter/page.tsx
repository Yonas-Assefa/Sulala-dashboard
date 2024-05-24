'use client'
import BackButton from '@/components/common/ui/BackButton'
import { Metadata } from 'next';
import React, { useEffect } from 'react'

export const metadata: Metadata = {
    title: 'Sulala | Auth Confirmation Letter',
    description: 'Confirm your email address to get started with Sulala.',
    icons: [
        '/sulala-logo.svg',
    ]
};

type Props = {
    searchParams: {
        email: string
    }
}
function ConfirmationLetter({ searchParams: { email } }: Props) {
    const [counter, setCounter] = React.useState(30)

    useEffect(() => {
        const interval = setInterval(() => {
            counter > 0 ? setCounter(counter - 1) : clearInterval(interval)
        }, 1000)
        return () => clearInterval(interval)
    })

    return (
        <div className='text-black w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center'>
            <div className='flex w-full'>
                <BackButton />
            </div>
            {/* SIGN IN HEADER */}
            <div className='flex flex-col gap-6'>
                <h1 className='text-[40px] font-serif font-semibold self-start'>The confirmation letter has been sent</h1>
                <p className='text-gray-500'>Check the &nbsp; <span className='text-primary font-semibold'>{email}</span> &nbsp;
                    mailbox to which the registration confirmation email was sent.
                </p>
                <div className='flex flex-col gap-6 w-full'>
                    {/* SIGN UP LINK */}
                    <div className='flex flex-col gap-3 w-full items-center'>
                        {counter > 0 ?
                            <p className='text-[#70757f]'>Send new email in 00:{counter}</p> :
                            <button className='text-primary font-semibold btn bg-transparent focus:bg-transparent hover:bg-transparent border-0 shadow-none'>Send new email</button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmationLetter