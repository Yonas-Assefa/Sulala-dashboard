'use client'
import React from 'react'
import CropImageModal from '../modal/CropImageModal'
import { openModal } from '@/lib/modals'
import { dataURLtoFile } from '@/utils/convertDataURLtoFile'
import { deleteShopProfile } from '@/actions/settings/delete-shop-profile'
import { useFormState } from 'react-dom'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import { useToastMessage } from '@/hooks/useToastMessage'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'

type Props = {
    error?: string | undefined
    name?: string
    id?: string
    defaultValue?: string
}

function ProfileImagePicker({ error, name, id, defaultValue }: Props) {
    const [image, setImage] = React.useState<{ dataUrl: boolean, value: string | undefined }>({ dataUrl: false, value: defaultValue })
    const [imageTem, setImageTem] = React.useState<{ dataUrl: boolean, value: string | undefined }>()
    const [rawImage, setRawImage] = React.useState<string | undefined>()
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [formState, action] = useFormState(
        deleteShopProfile,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    React.useEffect(() => {
        if (inputRef.current && image.dataUrl) {
            const dataTransfer = new DataTransfer();
            const file = dataURLtoFile(image.value, 'image.png');
            dataTransfer.items.add(file);
            inputRef.current.files = dataTransfer.files;
        }
    }, [image])

    const handleCropChange = (event: HTMLCanvasElement["toDataURL"]) => {
        setImage({ dataUrl: true, value: event.toString() })
    }

    const cancelCrop = () => {
        setImage(imageTem || { dataUrl: false, value: undefined })
        setImageTem(undefined)
    }

    const saveCrop = () => {
        setImageTem(undefined)
    }

    const handleDeleteImage = () => {
        const form = new FormData()
        form.append('profile_photo', '')
        action(form)
        setImage({ dataUrl: false, value: undefined })
        setRawImage(undefined)
    }

    const handleRawImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageTem(image)
        const selectedFiles = Array.from(event.target.files as Iterable<File> | ArrayLike<File>);
        const uploadedImages = selectedFiles.map((file) => URL.createObjectURL(file));
        setRawImage(uploadedImages[0]);
        openModal('crop_image_setting_modal')
    }

    return (
        <>
            <CropImageModal saveCrop={saveCrop} cancelCrop={cancelCrop} handleCropChange={handleCropChange} rawImage={rawImage} />
            <div className='flex flex-row gap-4 items-center'>
                {!image.value ?
                    <label htmlFor={id} className='flex flex-row gap-4 items-center cursor-pointer' >
                        <div className={`cursor-pointer w-[6vw] min-w-[50px] flex justify-center items-center aspect-square rounded-full ${error ? 'border-danger border bg-dangerlight' : 'bg-tertiary'}`}>
                            <img src={error ? '/icons/camera-red.svg' : '/icons/camera.svg'} alt="" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className={`font-semibold ${error ? 'text-danger' : 'text-primary'}`}>Add photo</p>
                            <div className='text-secondary flex flex-col gap-0'>
                                <span>JPEG, PNG</span>
                                <span>Max 20 MB</span>
                            </div>
                        </div>
                    </label> :
                    <div className='flex flex-row gap-4 items-center'>
                        <img src={image.value} alt="" className='rounded-full aspect-square  w-[6vw] min-w-[50px]' />
                        <div className='flex flex-row gap-2'>
                            <label htmlFor={id} className='text-primary font-semibold cursor-pointer'>Change photo</label>
                            <button type='button' className='text-danger font-semibold' onClick={handleDeleteImage}>Delete photo</button>
                        </div>
                    </div>
                }
                <input ref={inputRef} type="file" name={name} id={id} className='hidden' accept='image/*' onChange={handleRawImage} />
            </div>
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </>
    )
}

export default ProfileImagePicker