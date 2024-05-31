'use client'
import { FileInputProps } from '@/types/props.type'
import React from 'react'
import ResetButton from '../ui/ResetButton'
import { formatFileSize } from '@/utils/filesizeFormatter.util'

function FileInput({ label, name, error, accept, id, sizeLimit }: FileInputProps) {

    const [file, setFile] = React.useState<File | null | undefined>(null)
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0])
    }

    React.useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            file instanceof File && dataTransfer.items.add(file);
            inputRef.current.files = dataTransfer.files;
        }
    }, [file]);

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
                    <div className={`border border-dashed flex flex-col justify-center py-8 gap-4 items-center px-3 rounded-[30px] w-full ${error && 'border-danger bg-dangerlight'}`}>
                        <img src={error ? "/icons/file-red.svg" : "/icons/file.svg"} alt="" />
                        <p className='text-secondary text-center'>{acceptFilesList.join('')} file, Maximum 5 MB</p>
                        <div className='flex gap-2'>
                            <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                            <p className='text-primary font-semibold'>Upload</p>
                        </div>
                    </div>
                </label>
                <input
                    type="file"
                    ref={inputRef}
                    id={id || 'file-1'}
                    name={name || 'text-input'}
                    onChange={handleFile}
                    accept={accept.join(',')}
                    hidden
                />
                <div className={`w-full flex flex-row justify-between ${!file && 'hidden'}`}>
                    <div className={`flex flex-row gap-5 `}>
                        <img src={error ? "/icons/file-red.svg" : "/icons/file-green.svg"} alt="" />
                        <div className='flex items-center gap-1'>
                            <p className={`font-semibold ${error ? 'text-danger' : 'text-black'}`}>{file?.name}</p>
                            {file && sizeLimit && <sub className={`text-xs font-semibold ${(formatFileSize(file.size).value > sizeLimit.value && ['MB', 'GB', 'TB'].includes(formatFileSize(file.size)?.unit)) ? 'text-danger/70' : 'text-primary/70 '}`}>({formatFileSize(file.size).text})</sub>}
                        </div>
                    </div>
                    <ResetButton handleClear={() => setFile(null)} show />
                </div>
                {error && <span className="text-xs text-danger">
                    {error}
                </span>}
            </div >
        </>
    )
}

export default FileInput