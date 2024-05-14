'use client'
import OTPInput from '@/components/OTPInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { verifyPhone } from '@/services/api.service'
import { validateOtp } from '@/services/validate.service'
import { TVerifyPhone } from '@/types/api-service.type'
import React, { ElementRef } from 'react'

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

    const { fieldErrors, onSubmit, loading } = useFormSubmit<TVerifyPhone>({
        Fn: verifyPhone,
        Opt: {
            successMessage: 'Verification successful!',
            failureMessage: 'Failed to verify phone number',
            successRedirectUrl: '/dashboard/settings'
        },
        validate: validateOtp
    })

    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-6 w-full'>
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
                    <PrimaryButton name='Confirm' type='submit' ref={submitBtn} disabled={disabled} isLoading={loading} />
                </div>
            </div>
        </form>
    )
}

export default EnterOtpForm