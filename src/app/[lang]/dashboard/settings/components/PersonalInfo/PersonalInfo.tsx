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
import { useParams } from 'next/navigation'
import { getDictionary } from '@/i18n/dictionaries'

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

    const { lang } = useParams()

    const dictionary = await getDictionary(lang as string)

    return (
        <form action={action} className='mt-4 w-full flex flex-col gap-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 max-w-[1300px] gap-5'>
                <TextInput id='first_name' name='first_name' placeholder={dictionary.commons.first_name} label={dictionary.commons.first_name} defaultValue={data.first_name} error={formState?.fieldErrors?.first_name?.[0]} />
                <TextInput id='last_name' name='last_name' placeholder={dictionary.commons.last_name} label={dictionary.commons.last_name} defaultValue={data.last_name} error={formState?.fieldErrors?.last_name?.[0]} />
                <div className='flex flex-col gap-0 w-full items-center'>
                    <PhoneNumberInput defaultValue={data.phone_number} error={formState?.fieldErrors?.phone_number?.[0]} label={dictionary.commons.phone_number} />
                </div>
                <div className='w-full flex flex-col relative'>
                    <TextInput id='email' name='email' placeholder={dictionary.commons.email} label={dictionary.commons.email} defaultValue={data.email} error={formState?.fieldErrors?.email?.[0]} />
                    <div className='flex self-end flex-row gap-1 absolute -bottom-5 '>
                        <img src={data.email_verified == false ? "/icons/alert.svg" : "/icons/verified.svg"} alt="" className='w-[15px] aspect-square' />
                        <p className={`text-[13px] font-semibold italic ${data.email_verified == false ? 'text-danger' : 'text-primary'}`}>{data.email_verified == false ? dictionary.commons.email_not_verified : dictionary.commons.email_verified}</p>
                    </div>
                </div>
                <TextInput id='address' name='address' placeholder={dictionary.commons.address} label={dictionary.commons.address} error={formState?.fieldErrors?.address?.[0]} />
            </div>

            <div className='flex flex-col items-start py-4 gap-8'>
                <PrimaryButton padding={'md'} name={dictionary.commons.submit} type='submit' />
                <div className='flex flex-col gap-3'>
                    <SecondaryButton padding={'sm'} name={dictionary.commons.change_password} modal='change_password_setting_modal' type='button' />
                    <SecondaryButton padding={'xsm'} name={dictionary.commons.log_out} modal='logout_setting_modal' type='button' />
                </div>
            </div>
        </form>
    )
}

export default PersonalInfo