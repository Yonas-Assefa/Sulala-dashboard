'use client'
import PhoneNumberInput from './common/form/PhoneNumberInput'

import React from "react"

function SignInWithPhone() {

    return (
        <div className='flex flex-col gap-3 w-full items-center'>
            <PhoneNumberInput />
        </div>

    )
}

export default SignInWithPhone