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

function PersonalInfo({ data }: Props) {

    const [formState, action] = useFormState(
        updatePersonalInfo,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <form action={action} className='mt-4 w-full flex flex-col gap-8'>
            <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                <TextInput id='first_name' name='first_name' placeholder='First name' label='First name' defaultValue={data.first_name} error={formState?.fieldErrors?.first_name?.[0]} />
                <TextInput id='last_name' name='last_name' placeholder='Last name' label='Last name' defaultValue={data.last_name} error={formState?.fieldErrors?.last_name?.[0]} />
                <div className='flex flex-col gap-0 w-full items-center'>
                    <PhoneNumberInput defaultValue={data.phone_number} error={formState?.fieldErrors?.phone_number?.[0]} />
                </div>
                <TextInput id='email' name='email' placeholder='Email' label='Email' defaultValue={data.email} error={formState?.fieldErrors?.email?.[0]} />
                <TextInput id='address' name='address' placeholder='Address' label='Address' error={formState?.fieldErrors?.address?.[0]} />
            </div>

            <div className='flex flex-col items-start py-4 gap-8'>
                <PrimaryButton padding={'md'} name='Save' type='submit' />
                <div className='flex flex-col gap-3'>
                    <SecondaryButton padding={'sm'} name='Change password' modal='change_password_setting_modal' type='button' />
                    <SecondaryButton padding={'xsm'} name='Log out' modal='logout_setting_modal' type='button' />
                </div>
            </div>
        </form>
    )
}

export default PersonalInfo