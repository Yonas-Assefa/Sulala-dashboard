'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useCreateQueryString } from '@/hooks/useCreateQueryString';

type Props = {
    handleCropChange: (event: any) => void
    rawImage: string
}

function CropImageModal({ handleCropChange, rawImage }: Props) {
    const router = useRouter()
    const { searchParams, createQueryStringAndPush } = useCreateQueryString()
    const cropperRef = React.useRef<ReactCropperElement>(null);
    const open = searchParams.get('action') == 'crop-image'

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        handleCropChange(cropper?.getCroppedCanvas().toDataURL());
    };

    const handleClick = () => {
        createQueryStringAndPush('action', '')
    }

    return (
        <dialog id="my_modal_4" className={`modal ${open && 'modal-open'}`} onClick={() => router.back()}>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0" onClick={(e) => e.stopPropagation()}>
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Crop your photo</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <Cropper
                        src={rawImage}
                        style={{ height: 400, width: "100%" }}
                        // Cropper.js options
                        initialAspectRatio={9 / 9}
                        guides={false}
                        crop={onCrop}
                        ref={cropperRef}
                    />
                    <div className='flex w-full flex-col' onClick={handleClick}>
                        <PrimaryButton name='Save' />
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default CropImageModal