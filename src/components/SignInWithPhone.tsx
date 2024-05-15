'use client'
import PhoneNumberInput from './common/form/PhoneNumberInput'

import React from "react"

function SignInWithPhone({ error }: { error?: string }) {

    return (
        <div className='flex flex-col gap-3 w-full items-center'>
            <PhoneNumberInput error={error} />
        </div>

    )
}

export default SignInWithPhone