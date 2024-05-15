'use client'
import React from 'react'
import TextInput from './common/form/TextInput'
import FileInput from './common/form/FileInput'
import CustomMultiSelectInput from './common/form/SelectInput'
import PrimaryButton from './common/ui/PrimaryButton'
import { useFormState } from 'react-dom'
import { setupAccount } from '@/actions/setup-account'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import { useToastMessage } from '@/hooks/useToastMessage'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'

function SetupAccountStageOne({ formState }: { formState: FormState }) {
    return (
        <section className='flex flex-col gap-5 w-full items-stretch'>
            <TextInput label="What's your first name?" placeholder='Enter your first name' id='first_name' name='first_name' error={formState.fieldErrors?.first_name?.[0]} />
            <TextInput label="What's your last name?" placeholder='Enter your last name' id='last_name' name='last_name' error={formState.fieldErrors?.last_name?.[0]} />
            <TextInput label="What's your email address?" placeholder='Enter your email address' id='email' name='email' error={formState.fieldErrors?.email?.[0]} />
        </section>
    )
}

function SetupAccountStageTwo({ formState }: { formState: FormState }) {
    return (
        <section className='flex flex-col gap-5 w-full items-stretch'>
            <TextInput label="What's your company name?" placeholder='Enter your company name' id='company_name' name='company_name' error={formState.fieldErrors?.company_name?.[0]} />
            <CustomMultiSelectInput multi={false} nested={false} label='Please choose categories for sale' placeholder='Choose categories' id='sale_category' name='sale_category' error={formState.fieldErrors?.sale_category?.[0]} />
            <TextInput label="What's your legal address?" placeholder='Enter your legal address' id='address' name='address' error={formState.fieldErrors?.address?.[0]} />
        </section>
    )
}

function SetupAccountStageThree({ formState }: { formState: FormState }) {

    const [certificate, SetCertificate] = React.useState<FileList | null>(null)
    const [taxForm, SetTaxForm] = React.useState<FileList | null>(null)

    const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetCertificate(e.target.files)
    }

    const handleTaxForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetTaxForm(e.target.files)
    }

    return (
        <section className='flex flex-col gap-5 w-full items-start'>
            <h4 className='font-semibold'>Please upload documents</h4>
            <FileInput label='Please attach the certificates' handleFile={handleCertificate} file={certificate} accept={['.pdf', 'image/*']} id='certificate' name='certificate' />
            <FileInput label='Please attach the tax section' handleFile={handleTaxForm} file={taxForm} accept={['.pdf', 'image/*']} id='tax_form' name='tax_form' />
        </section>
    )
}

function SetupAccountForm({ activeStage }: { activeStage: string }) {

    const [formState, action] = useFormState(
        setupAccount,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <form action={action}>
            {activeStage === 'one' && <SetupAccountStageOne formState={formState} />}
            {activeStage === 'two' && <SetupAccountStageTwo formState={formState} />}
            {activeStage === 'three' && <SetupAccountStageThree formState={formState} />}
            <input type="text" name="stage" id="stage" hidden value={activeStage} />
            <div className='flex flex-col items-stretch gap-3 w-full my-6'>
                <PrimaryButton name='Continue' type='submit' />
                <p className='text-black font-semibold text-center'>By verifying your account, you agree
                    to the <span className='text-primary'>Terms of Service and Privacy Policy</span></p>
            </div>
        </form>
    )
}

export default SetupAccountForm