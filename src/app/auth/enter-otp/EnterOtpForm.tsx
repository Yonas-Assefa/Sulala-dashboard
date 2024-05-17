'use client'
import { enterOtp } from '@/actions/auth/enter-otp'
import { resendOtp } from '@/actions/auth/resend-otp'
import OTPInput from '@/components/common/form/OTPInput'
import Counter from '@/components/common/ui/Counter'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { HiddenInput } from '@/types/common.types'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import React, { ElementRef } from 'react'
import { useFormState } from 'react-dom'

type Props = {
    phone: string
    action: string
}

function EnterOtpForm({ phone, action: authAction }: Props) {
    const submitBtn = React.useRef<ElementRef<'button'>>(null)
    const [disabled, setDisabled] = React.useState(true)
    const [otp, setOTP] = React.useState<string[]>(['', '', '', '', '', ''])

    const [counterFormState, setCounterFormState] = React.useState<FormState>(EMPTY_FORM_STATE)

    const [formState, action] = useFormState(
        enterOtp,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useToastMessage(counterFormState);
    useRedirectRoute(formState);

    const counterFunction = async () => {
        const res = await resendOtp({ phone_number: phone })
        setCounterFormState(res)
    }

    return (
        <form action={action} className='flex flex-col gap-6 w-full'>
            {/* OTP IN INPUT */}
            <OTPInput submitBtn={submitBtn} setDisabled={setDisabled} otp={otp} setOTP={setOTP} />
            {/* SIGN UP LINK */}
            <input type="text" name="phone_number" id='phone_number' hidden value={phone} />
            <input type="text" name="otp" id="otp" hidden value={otp.join('')} />
            <input type="text" name="action" id="action" hidden value={authAction} />
            <div className='flex flex-col gap-3 w-full items-center'>
                <Counter initialValue={0} buttonLabel='Send new code' buttonFunction={counterFunction} />
                <div className='flex flex-col w-full'>
                    <PrimaryButton name='Confirm' type='submit' ref={submitBtn} disabled={disabled} />
                </div>
            </div>
        </form>
    )
}

export default EnterOtpForm