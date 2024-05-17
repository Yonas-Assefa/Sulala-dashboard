'use client'
import PhoneNumberInput from '@/components/common/form/PhoneNumberInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import { useFormState } from 'react-dom'
import { updatePersonalInfo } from '@/actions/settings/update-personal-info'

type Props = {
    data: any
}
async function PersonalInfo({ data }: Props) {

    const [formState, action] = useFormState(
        updatePersonalInfo,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <form action={action} className='mt-4 w-full flex flex-col gap-8'>
            <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                <TextInput id='first-name' placeholder='First name' label='First name' defaultValue={data.first_name} />
                <TextInput id='last-name' placeholder='Last name' label='Last name' defaultValue={data.last_name} />
                <div className='flex flex-col gap-0 w-full items-center'>
                    <PhoneNumberInput defaultValue={data.phone_number} />
                </div>
                <TextInput id='email' placeholder='Email' label='Email' defaultValue={data.email} />
                <TextInput id='address' placeholder='Address' label='Address' />
            </div>

            <div className='flex flex-col items-start py-4 gap-8'>
                <PrimaryButton padding={'md'} name='Save' type='submit' />
                <div className='flex flex-col gap-3'>
                    <SecondaryButton padding={'sm'} name='Change password' modal='change_password_setting_modal' />
                    <SecondaryButton padding={'xsm'} name='Log out' modal='logout_setting_modal' />
                </div>
            </div>
        </form>
    )
}

export default PersonalInfo