'use client'
import React from 'react'
import CropImageModal from '../modal/CropImageModal'
import { openModal } from '@/utils/openModal'

function ProfileImagePicker() {
    const [image, setImage] = React.useState<string | undefined>()
    const [rawImage, setRawImage] = React.useState<string | undefined>()

    const handleCropChange = (event: HTMLCanvasElement["toDataURL"]) => {
        setImage(event)
    }

    const handleDeleteImage = () => {
        setImage(undefined)
        setRawImage(undefined)
    }

    const handleRawImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files as Iterable<File> | ArrayLike<File>);
        const uploadedImages = selectedFiles.map((file) => URL.createObjectURL(file));
        setRawImage(uploadedImages[0]);
        openModal('crop_image_setting_modal')
    }

    return (
        <>
            <CropImageModal handleCropChange={handleCropChange} rawImage={rawImage} />
            <div className='flex flex-row gap-4 items-center'>
                {!image ?
                    <label htmlFor='add-photo' className='flex flex-row gap-4 items-center cursor-pointer' >
                        <div className="bg-tertiary cursor-pointer w-[6vw] min-w-[50px] flex justify-center items-center aspect-square rounded-full">
                            <img src="/icons/camera.svg" alt="" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-primary font-semibold'>Add photo</p>
                            <div className='text-secondary flex flex-col gap-0'>
                                <span>JPEG, PNG</span>
                                <span>Max 20 MB</span>
                            </div>
                        </div>
                    </label> :
                    <div className='flex flex-row gap-4 items-center'>
                        <img src={image} alt="" className='rounded-full aspect-square  w-[6vw] min-w-[50px]' />
                        <div className='flex flex-row gap-2'>
                            <label htmlFor='add-photo' className='text-primary font-semibold cursor-pointer'>Change photo</label>
                            <button className='text-danger font-semibold' onClick={handleDeleteImage}>Delete photo</button>
                        </div>
                    </div>
                }
                <input type="file" name="add-photo" id="add-photo" className='hidden' accept='image/*' onChange={handleRawImage} />
            </div></>
    )
}

export default ProfileImagePicker