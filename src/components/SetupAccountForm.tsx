import React from 'react'
import TextInput from './common/form/TextInput'
import FileInput from './common/form/FileInput'
import CustomMultiSelectInput from './common/form/SelectInput'

function SetupAccountStageOne() {
    return (
        <form className='flex flex-col gap-5 w-full items-stretch'>
            <TextInput label="What's your first name?" placeholder='Enter your first name' id='first_name' name='first_name' />
            <TextInput label="What's your last name?" placeholder='Enter your last name' id='last_name' name='last_name' />
            <TextInput label="What's your email address?" placeholder='Enter your email address' id='email' name='email' />
        </form>
    )
}

function SetupAccountStageTwo() {
    return (
        <form className='flex flex-col gap-5 w-full items-stretch'>
            <TextInput label="What's your company name?" placeholder='Enter your company name' id='company_name' name='company_name' />
            <CustomMultiSelectInput multi={false} nested={false} label='Please choose categories for sale' placeholder='Choose categories' id='sale_category' name='sale_category' />
            <TextInput label="What's your legal address?" placeholder='Enter your legal address' id='address' name='address' />
        </form>
    )
}

function SetupAccountStageThree() {

    const [certificate, SetCertificate] = React.useState<FileList | null>(null)
    const [taxForm, SetTaxForm] = React.useState<FileList | null>(null)

    const handleCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetCertificate(e.target.files)
    }

    const handleTaxForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetTaxForm(e.target.files)
    }

    return (
        <form className='flex flex-col gap-5 w-full items-start'>
            <h4 className='font-semibold'>Please upload documents</h4>
            <FileInput label='Please attach the certificates' handleFile={handleCertificate} file={certificate} accept={['.pdf', 'image/*']} id='certificate' name='certificate' />
            <FileInput label='Please attach the tax form' handleFile={handleTaxForm} file={taxForm} accept={['.pdf', 'image/*']} id='tax_form' name='tax_form' />
        </form>
    )
}

function SetupAccountForm({ activeStage }: { activeStage: string }) {
    return (
        <div>
            {activeStage === 'one' && <SetupAccountStageOne />}
            {activeStage === 'two' && <SetupAccountStageTwo />}
            {activeStage === 'three' && <SetupAccountStageThree />}
        </div>
    )
}

export default SetupAccountForm