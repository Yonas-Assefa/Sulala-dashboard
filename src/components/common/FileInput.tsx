import { FileInputProps } from '@/types/props.type'
import React from 'react'

function FileInput({ onChange, label, name, error, onClear, value, ...props }: FileInputProps) {

    return (
        <>
            <div className='w-full'>
                {!value?.length ?
                    <>
                        <label htmlFor="file-1" className=' cursor-pointer w-full flex flex-col gap-3'>
                            <p className='text-secondary'>{label}</p>
                            <div className='border border-dashed flex flex-col justify-center py-8 gap-4 items-center px-3 rounded-[40px] w-full'>
                                <img src="/icons/file.svg" alt="" />
                                <p className='text-secondary'>PDF file, Maximum 5 MB</p>
                                <div className='flex gap-2'>
                                    <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                                    <p className='text-primary font-semibold'>Upload</p>
                                </div>
                            </div>
                        </label>
                        <input
                            type="file"
                            id='file-1'
                            name={name || 'text-input'}
                            className="hidden"
                            onChange={onChange}
                        />
                    </> :
                    <div className='flex flex-row gap-5'>
                        <img src="/icons/file-green.svg" alt="" />
                        <p className='font-semibold'>{value?.[0]?.name}</p>
                    </div>}
            </div >
        </>
    )
}

export default FileInput