'use client'
import React, { useEffect } from 'react'
import ImageUnselectButton from '../ui/ImageUnselectButton'
import { convertToArray } from '@/utils/convertObjToArray'
import Image from 'next/image'
import DeleteModal from '../modal/DeleteModal'
import { closeModal, openModal } from '@/lib/modals'
import ImageDeleteModal from './ImageDeleteModal'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import { useToastMessage } from '@/hooks/useToastMessage'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'

type Props = {
    multi?: boolean
    label?: string
    error?: string
    id?: string
    name?: string
    defaultValues?: string[]
    setValue?: (val: (File | string)[]) => void
    onDelete?: {
        action: (formData: FormData) => Promise<FormState>
        formData: { key: string, value: string }[]
    }
}

function ImageListSelector({
    multi = false,
    label,
    error,
    name,
    id,
    defaultValues,
    setValue,
    onDelete
}: Props) {
    const [fileList, setFileList] = React.useState<(File | string)[]>(convertToArray(defaultValues));
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [formState, setFormState] = React.useState(EMPTY_FORM_STATE)
    const [isPending, startTransition] = React.useTransition();

    useToastMessage(formState);
    useRedirectRoute(formState);

    const handleDelete = async (index?: number) => {
        startTransition(async () => {
            const formData = new FormData()
            onDelete?.formData.forEach((ele) => {
                formData.append(ele.key, ele.value)
            })
            const response = await onDelete?.action(formData)
            setFormState(response || EMPTY_FORM_STATE)
            if (response?.status === 'SUCCESS') {
                setFileList(!index ? [] : (prevFile) => prevFile.filter((_, i) => i !== index))
                closeModal('image_delete_modal')
            }
        });
    }

    const handleCancel = () => {
        closeModal('image_delete_modal')
    }

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            fileList.forEach((file) => typeof file !== 'string' && dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        if (setValue) {
            setValue(fileList)
        }
    }, [fileList]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files as Iterable<File> | ArrayLike<File>);
        setFileList(fileList.concat(selectedFiles));
    };

    const handleRemoveImage = (index?: number) => {
        openModal('image_delete_modal', true)
            .then((result) => {
                if (result) {
                    handleDelete(index)
                } else {
                    handleCancel()
                }
            })
    }
    return (
        <div className='flex flex-col gap-1'>
            <ImageDeleteModal isPending={isPending} />
            <p>{label || 'Images'}</p>
            {fileList.length == 0 ?
                <label htmlFor={id} className={`flex flex-col items-center justify-center gap-5 cursor-pointer w-full p-4 border rounded-[30px] border-dashed h-[300px] select-none ${error ? 'border-danger bg-dangerlight' : 'bg-white'}`}>
                    <img src="/icons/image.svg" alt="" />
                    <div className='flex flex-col justify-center items-center text-secondary'>
                        <p>Upload upto 8 images. JPEG, PNG</p>
                        <p>Maximum size 20 MB</p>
                    </div>
                    <div className='flex gap-2'>
                        <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                        <p className='text-primary font-semibold'>Upload</p>
                    </div>
                </label> : multi ?
                    <div className='flex flex-wrap gap-3'>
                        {
                            fileList.map((file, index) => (
                                <div key={index} className='bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative'>
                                    <ImageUnselectButton
                                        // handleClick={() => {
                                        //     setFileList((prevFile) => prevFile.filter((_, i) => i !== index))
                                        // }}
                                        handleClick={() => handleRemoveImage(index)}
                                    />
                                    <Image width={100} height={100} src={typeof file == 'string' ? file : URL.createObjectURL(file)} alt="" className='w-full h-full rounded-[20px]' />
                                </div>
                            ))
                        }
                        <label htmlFor={id} className='bg-[#ffffff] cursor-pointer block h-[180px] aspect-square rounded-[20px]'>
                            <div className='w-full h-full flex justify-center items-center'>
                                <img src="/icons/image.svg" alt="" className='w-[30px] aspect-square' />
                            </div>
                        </label>
                    </div> :
                    <div className='w-full'>
                        <div className='bg-[#d9d9d9] block rounded-[20px] relative'>
                            <ImageUnselectButton handleClick={() => handleRemoveImage()} />
                            <Image width={500} height={500} quality={100} src={typeof fileList[0] == 'string' ? fileList[0] : URL.createObjectURL(fileList[0])} alt="" className='w-full h-full rounded-[20px]' />
                        </div>
                    </div>}
            <input
                type="file"
                ref={inputRef}
                name={name}
                id={id}
                data-testid="uploader"
                onChange={handleImageUpload}
                multiple={multi}
                accept='image/*'
                hidden
            />

            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default ImageListSelector