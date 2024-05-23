'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { setupAccount } from '@/actions/auth/setup-account'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import { useToastMessage } from '@/hooks/useToastMessage'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { useCounterStore } from '@/providers/setup-account-store-provider'
import FileInput from '@/components/common/form/FileInput'
import CustomMultiSelectInput from '@/components/common/form/SelectInput'
import TextInput from '@/components/common/form/TextInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'

function SetupAccountStageOne({ formState, show }: { formState: FormState, show: boolean }) {
    const { first_name, last_name, email, setFirstName, setLastName, setEmail } = useCounterStore(
        (state) => state,
    )
    return (
        <section className={`flex flex-col gap-5 w-full items-stretch ${!show && 'hidden'}`}>
            <TextInput value={first_name} setValue={setFirstName} label="What's your first name?" placeholder='Enter your first name' id='first_name' name='first_name' error={formState.fieldErrors?.first_name?.[0]} />
            <TextInput value={last_name} setValue={setLastName} label="What's your last name?" placeholder='Enter your last name' id='last_name' name='last_name' error={formState.fieldErrors?.last_name?.[0]} />
            <TextInput value={email} setValue={setEmail} label="What's your email address?" placeholder='Enter your email address' id='email' name='email' error={formState.fieldErrors?.email?.[0]} />
        </section>
    )
}

function SetupAccountStageTwo({ formState, categoryLists, show }: { formState: FormState, categoryLists: any, show: boolean }) {
    const { campany_name, sales_category, address, setSalesCategory, setAddress, setCompanyName } = useCounterStore(
        (state) => state,
    )
    const data = categoryLists
    return (
        <section className={`flex flex-col gap-5 w-full items-stretch ${!show && 'hidden'}`}>
            <TextInput value={campany_name} setValue={setCompanyName} label="What's your company name?" placeholder='Enter your company name' id='company_name' name='company_name' error={formState.fieldErrors?.name?.[0]} />
            <CustomMultiSelectInput value={sales_category} setValue={setSalesCategory} label='Please choose categories for sale' placeholder='Choose categories' id='sale_category' name='sale_category' error={formState.fieldErrors?.category?.[0]} data={data} />
            <TextInput value={address} setValue={setAddress} label="What's your legal address?" placeholder='Enter your legal address' id='address' name='address' error={formState.fieldErrors?.legal_address?.[0]} />
        </section>
    )
}

function SetupAccountStageThree({ formState, show }: { formState: FormState, show: boolean }) {

    const [certificate, SetCertificate] = React.useState<FileList | null>(null)
    const [taxForm, SetTaxForm] = React.useState<FileList | null>(null)

    const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetCertificate(e.target.files)
    }

    const handleTaxForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetTaxForm(e.target.files)
    }

    return (
        <section className={`flex flex-col gap-5 w-full items-start ${!show && 'hidden'}`}>
            <h4 className='font-semibold'>Please upload documents</h4>
            <FileInput label='Please attach the certificates' handleFile={handleCertificate} file={certificate} accept={['.pdf', 'image/*']} id='certificate' name='certificate' error={formState.fieldErrors?.certificates?.[0]} />
            <FileInput label='Please attach the tax section' handleFile={handleTaxForm} file={taxForm} accept={['.pdf', 'image/*']} id='tax_form' name='tax_form' error={formState.fieldErrors?.tax_forms?.[0]} />
        </section>
    )
}

function SetupAccountForm({ categoryLists, activeStage }: { categoryLists: any, activeStage: string }) {

    const { createQueryStringAndPush } = useCreateQueryString()

    const handleNext = () => {
        const nextStage = activeStage === 'one' ? 'two' : 'three'
        createQueryStringAndPush('stage', nextStage)
    }

    const [formState, action] = useFormState(
        setupAccount,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <form action={action}>
            <SetupAccountStageOne formState={formState} show={activeStage === 'one'} />
            <SetupAccountStageTwo formState={formState} categoryLists={categoryLists} show={activeStage === 'two'} />
            <SetupAccountStageThree formState={formState} show={activeStage === 'three'} />
            <input type="text" name="stage" id="stage" hidden value={activeStage} />
            <div className='flex flex-col items-stretch gap-3 w-full my-6'>
                <PrimaryButton name='Continue' type={activeStage !== 'two' ? 'submit' : 'button'} handleClick={handleNext} />
                <p className='text-black font-semibold text-center'>By verifying your account, you agree
                    to the <span className='text-primary'>Terms of Service and Privacy Policy</span></p>
            </div>
        </form>
    )
}

export default SetupAccountForm