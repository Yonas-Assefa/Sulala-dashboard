'use client'
import React from 'react'
import CropImageModal from '../modal/CropImageModal'
import { openModal } from '@/utils/openModal'
import { dataURLtoFile } from '@/utils/convertDataURLtoFile'

type Props = {
    error?: string | undefined
    name?: string
    id?: string
}

function ProfileImagePicker({ error, name, id }: Props) {
    const [image, setImage] = React.useState<string | undefined>()
    const [imageTem, setImageTem] = React.useState<string | undefined>()
    const [rawImage, setRawImage] = React.useState<string | undefined>()
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            const file = dataURLtoFile(image, 'image.png');
            dataTransfer.items.add(file);
            inputRef.current.files = dataTransfer.files;
        }
    }, [image])

    const handleCropChange = (event: HTMLCanvasElement["toDataURL"]) => {
        setImage(event)
    }

    const cancelCrop = () => {
        setImage(imageTem)
        setImageTem(undefined)
    }

    const saveCrop = () => {
        setImageTem(undefined)
    }

    const handleDeleteImage = () => {
        setImage(undefined)
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
                {!image ?
                    <label htmlFor={id} className='flex flex-row gap-4 items-center cursor-pointer' >
                        <div className={`bg-tertiary cursor-pointer w-[6vw] min-w-[50px] flex justify-center items-center aspect-square rounded-full ${error && 'border-danger border'}`}>
                            <img src="/icons/camera.svg" alt="" />
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
                        <img src={image} alt="" className='rounded-full aspect-square  w-[6vw] min-w-[50px]' />
                        <div className='flex flex-row gap-2'>
                            <label htmlFor={id} className='text-primary font-semibold cursor-pointer'>Change photo</label>
                            <button className='text-danger font-semibold' onClick={handleDeleteImage}>Delete photo</button>
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