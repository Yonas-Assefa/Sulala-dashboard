import PhoneNumberInput from '@/components/common/PhoneNumberInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import TextInput from '@/components/common/TextInput'
import React from 'react'

function PersonalInfo() {
    return (
        <div className='mt-4 w-full flex flex-col gap-8'>
            <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                <TextInput id='first-name' placeholder='First name' label='First name' onChange={() => { }} onClear={() => { }} value='' />
                <TextInput id='last-name' placeholder='Last name' label='Last name' onChange={() => { }} onClear={() => { }} value='' />
                <PhoneNumberInput />
                <TextInput id='email' placeholder='Email' label='Email' onChange={() => { }} onClear={() => { }} value='' />
                <TextInput id='address' placeholder='Address' label='Address' onChange={() => { }} onClear={() => { }} value='' />
            </div>

            <div className='flex flex-col items-start py-4 gap-8'>
                <PrimaryButton padding={'md'} name='Save' onClick={() => { }} />
                <div className='flex flex-col gap-3'>
                    <SecondaryButton padding={'sm'} name='Change password' href='/dashboard/settings/personal-info/change-password' />
                    <SecondaryButton padding={'xsm'} name='Log out' href='/dashboard/settings/personal-info/logout' />
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo