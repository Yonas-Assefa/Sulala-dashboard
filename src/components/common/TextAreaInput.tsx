import React from 'react'

type Props = {
    id?: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    label?: string
    name?: string
    autoComplete?: string
    error?: string
    onClear?: () => void
}

function TextAreaInput({ id, name, label, placeholder }: Props) {
    return (
        <div className='col-span-2'>
            <label htmlFor={id} className='self-start'>{label}</label>
            <textarea name={name} placeholder={placeholder} className="textarea textarea-bordered rounded-[20px] textarea-lg w-full bg-white" ></textarea>
        </div>
    )
}

export default TextAreaInput