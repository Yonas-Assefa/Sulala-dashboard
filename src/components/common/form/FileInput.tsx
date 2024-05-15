'use client'
import { FileInputProps } from '@/types/props.type'
import React from 'react'

function FileInput({ label, name, error, accept, id, ...props }: FileInputProps) {

    const [file, setFile] = React.useState<File | null | undefined>(null)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0])
    }

    const acceptFilesList = accept.map((fileType, index) => {
        const filteredFileType = fileType.replace('.', '').toUpperCase()
        if (index === 0) {
            return filteredFileType
        } else if (index === accept.length - 1) {
            return ` or ${filteredFileType}`
        } else {
            return `, ${filteredFileType}`
        }
    }
    )

    return (
        <>
            <div className='w-full'>

                <label htmlFor={id || 'file-1'} className={`cursor-pointer w-full flex flex-col gap-3 ${file && 'hidden'}`}>
                    <p className='text-secondary'>{label}</p>
                    <div className='border border-dashed flex flex-col justify-center py-8 gap-4 items-center px-3 rounded-[30px] w-full'>
                        <img src="/icons/file.svg" alt="" />
                        <p className='text-secondary text-center'>{acceptFilesList.join('')} file, Maximum 5 MB</p>
                        <div className='flex gap-2'>
                            <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                            <p className='text-primary font-semibold'>Upload</p>
                        </div>
                    </div>
                </label>
                <input
                    type="file"
                    id={id || 'file-1'}
                    name={name || 'text-input'}
                    onChange={handleFile}
                    accept={accept.join(',')}
                    hidden
                />
                <div className={`flex flex-row gap-5 ${!file && 'hidden'}`}>
                    <img src="/icons/file-green.svg" alt="" />
                    <p className='font-semibold text-black'>{file?.name}</p>
                </div>
            </div >
        </>
    )
}

export default FileInput