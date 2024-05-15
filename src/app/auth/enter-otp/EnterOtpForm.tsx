'use client'
import { enterOtp } from '@/actions/enter-otp'
import OTPInput from '@/components/OTPInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import React, { ElementRef } from 'react'
import { useFormState } from 'react-dom'

type Props = {
    phone: string
    action: string
}

function EnterOtpForm({ phone, action: authAction }: Props) {
    const submitBtn = React.useRef<ElementRef<'button'>>(null)
    const [counter, setCounter] = React.useState(30)
    const [disabled, setDisabled] = React.useState(true)
    const [otp, setOTP] = React.useState<string[]>(['', '', '', '', '', ''])

    React.useEffect(() => {
        const interval = setInterval(() => {
            counter > 0 ? setCounter(counter - 1) : clearInterval(interval)
        }, 1000)
        return () => clearInterval(interval)
    })

    const [formState, action] = useFormState(
        enterOtp,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <form action={action} className='flex flex-col gap-6 w-full'>
            {/* OTP IN INPUT */}
            <OTPInput submitBtn={submitBtn} setDisabled={setDisabled} otp={otp} setOTP={setOTP} />
            {/* SIGN UP LINK */}
            <input type="text" name="phone_number" id='phone_number' hidden value={phone} />
            <input type="text" name="otp" id="otp" hidden value={otp.join('')} />
            <input type="text" name="action" id="action" hidden value={authAction} />
            <div className='flex flex-col gap-3 w-full items-center'>
                {counter > 0 ?
                    <p className='text-[#70757f]'>Send new code in 00:{counter}</p> :
                    <button className='text-primary font-semibold btn bg-transparent focus:bg-transparent hover:bg-transparent border-0 shadow-none'>Send new code</button>}
                <div className='flex flex-col w-full'>
                    <PrimaryButton name='Confirm' type='submit' ref={submitBtn} disabled={disabled} />
                </div>
            </div>
        </form>
    )
}

export default EnterOtpForm