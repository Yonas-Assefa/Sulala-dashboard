'use client'
import { signIn } from '@/actions/auth/signin'
import AuthWithEmail from '@/components/AuthWithEmail'
import AuthWithPhone from '@/components/AuthWithPhone'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useTranslations } from 'next-intl'
import { resendVerificationLink } from '@/actions/auth/resend-verification-link'
import pushNotification from '@/utils/pushNotification.util'
import { useRouter } from '@/i18n/navigation'
import { closeModal, openModal } from '@/lib/modals'

type SignInProps = {
    by: "phone" | "email" | undefined
}

function SignInForm({ by }: SignInProps) {

    const [formState, action] = useFormState(
        signIn,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    const router = useRouter()
    useEffect(() => {
        if (formState.message == 'Email not verified. Please verify your email first') {
            setTimeout(async () => {
                const confirm = await openModal('resend_email_verification_link', true)
                closeModal('resend_email_verification_link')

                if (!confirm) return;

                pushNotification('Resending verification link...', 'info')
                const email = document.getElementById('email')?.getAttribute('value')
                resendVerificationLink({ email })
                    .then((res: FormState) => {
                        if (res.status == 'SUCCESS') {
                            pushNotification(res.message, 'success')
                            router.push('/auth/confirm-letter?email=' + email as any)
                        } else {
                            pushNotification(res.message, 'error')
                        }
                    })
            }, 1000)
        }
    }, [formState])

    const t = useTranslations('Auth')

    return (
        <form action={action} className='flex flex-col gap-6 w-full md:px-10'>
            {/* SIGN IN INPUT */}
            {by !== 'email' ?
                <AuthWithPhone error={formState.fieldErrors?.phone_number?.[0]} /> :
                <AuthWithEmail emailError={formState.fieldErrors?.email?.[0]} passwordError={formState.fieldErrors?.password?.[0]} />
            }

            <input type='text' hidden name='by' value={by} onChange={() => { }} />

            {/* SIGN UP LINK */}
            <div className='flex flex-col gap-3 w-full items-center'>
                <div className='w-full flex flex-col'>
                    <PrimaryButton name={t('signin')} type='submit' />
                </div>

                <p className='text-[#70757f] select-none'>{t("don't_have_an_account")}</p>
                < SecondaryButton name={t('signup')} href={'/auth/sign-up'} />
            </div>
        </form>
    )
}

export default SignInForm