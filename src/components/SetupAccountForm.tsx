import React from 'react'
import TextInput from './common/form/TextInput'
import SelectInput from './common/form/LegacySelectInput'
import FileInput from './common/form/FileInput'

function SetupAccountStageOne() {
    return (
        <div className='flex flex-col gap-5 w-full items-stretch'>
            <TextInput label="What's your first name?" placeholder='Enter your first name' value='' onChange={() => { }} onClear={() => { }} />
            <TextInput label="What's your last name?" placeholder='Enter your last name' value='' onChange={() => { }} onClear={() => { }} />
            <TextInput label="What's your email address?" placeholder='Enter your email address' value='' onChange={() => { }} onClear={() => { }} />
        </div>
    )
}

function SetupAccountStageTwo() {
    return (
        <div className='flex flex-col gap-5 w-full items-stretch'>
            <TextInput label="What's your company name?" placeholder='Enter your company name' value='' onChange={() => { }} onClear={() => { }} />
            <SelectInput label='Please choose categories for sale' placeholder='Choose categories' value='' onChange={() => { }} onClear={() => { }} />
            <TextInput label="What's your legal address?" placeholder='Enter your email address' value='' onChange={() => { }} onClear={() => { }} />
        </div>
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

    const clearCertificate = () => {
        SetCertificate(null)
    }

    const clearTaxForm = () => {
        SetTaxForm(null)
    }

    return (
        <div className='flex flex-col gap-5 w-full items-start'>
            <h4 className='font-semibold'>Please upload documents</h4>
            <FileInput label='Please attach the certificates' onChange={handleCertificate} onClear={clearCertificate} value={certificate} />
            <FileInput label='Please attach the tax form' onChange={handleTaxForm} onClear={clearTaxForm} value={taxForm} />
        </div>
    )
}

function SetupAccountForm({ activeStage = 1 }) {
    return (
        <div>
            {activeStage === 1 && <SetupAccountStageOne />}
            {activeStage === 2 && <SetupAccountStageTwo />}
            {activeStage === 3 && <SetupAccountStageThree />}
        </div>
    )
}

export default SetupAccountForm