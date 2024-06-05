'use client';
import { resendVerificationLink } from '@/actions/auth/resend-verification-link';
import { getPersonalInfo } from '@/actions/settings/get-personal-info';
import BackButton from '@/components/common/ui/BackButton'
import Counter from '@/components/common/ui/Counter';
import { useRedirectRoute } from '@/hooks/useRedirectRoute';
import { useToastMessage } from '@/hooks/useToastMessage';
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper';
import { Metadata } from 'next';
import { redirect, useRouter } from '@/i18n/navigation';
import React from 'react'

// export const metadata: Metadata = {
//     title: 'Sulala | Auth Confirmation Letter',
//     description: 'Confirm your email address to get started with Sulala.',
//     icons: [
//         '/sulala-logo.svg',
//     ]
// };

type Props = {
    searchParams: {
        email: string
    }
}

function ConfirmationLetter({ searchParams: { email } }: Props) {
    const router = useRouter()
    const [formState, setFormState] = React.useState(EMPTY_FORM_STATE)

    const checkEmailVerification = async () => {
        const personalInfo = await getPersonalInfo()
        if (personalInfo?.email_verified && !personalInfo?.is_password_set && personalInfo?.email && !personalInfo?.phone_verified) {
            router.push('/auth/create-password')
        }
    }

    useToastMessage(formState)
    useRedirectRoute(formState)

    React.useEffect(() => {
        const interval = setInterval(() => {
            checkEmailVerification()
        }, 30000)
        return () => clearInterval(interval)
    }, [])


    const counterFunction = async () => {
        let personalInfo: any
        try {
            personalInfo = await getPersonalInfo()
        } catch (error) {
            console.error(error)
        }
        resendVerificationLink({ email: personalInfo?.email || email })
            .then((res) => {
                setFormState(res)

            })
    }

    return (
        <div className='text-black w-10/12 h-4/5 px-6 flex flex-col justify-evenly pb-8 items-center'>
            <div className='flex w-full'>
                <BackButton />
            </div>
            {/* SIGN IN HEADER */}
            <div className='flex flex-col gap-6'>
                <h1 className='text-4xl md:text-[40px] text-center font-serif font-semibold self-start'>The confirmation letter has been sent</h1>
                <p className='text-gray-500'>Check the &nbsp; <span className='text-primary font-semibold'>{email}</span> &nbsp;
                    mailbox to which the registration confirmation email was sent.
                </p>
                <div className='flex flex-col gap-6 w-full'>
                    {/* SIGN UP LINK */}
                    <div className='flex flex-col gap-3 w-full items-center'>

                        <Counter initialValue={30} buttonLabel='Send new email' buttonFunction={counterFunction} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmationLetter