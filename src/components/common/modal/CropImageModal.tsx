'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import SecondaryButton from '../ui/SecondaryButton';

type Props = {
    handleCropChange: (event: any) => void
    rawImage: string | undefined
    saveCrop: () => void
    cancelCrop: () => void
}

function CropImageModal({ handleCropChange, rawImage, saveCrop, cancelCrop }: Props) {
    const cropperRef = React.useRef<ReactCropperElement>(null);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        handleCropChange(cropper?.getCroppedCanvas().toDataURL());
    };

    return (
        <dialog id="crop_image_setting_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
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
                    <form method="dialog" className='flex w-full flex-col gap-3'>
                        <PrimaryButton name='Save' handleClick={saveCrop} />
                    </form>
                    <form method="dialog">
                        <SecondaryButton name='Cancel' handleClick={cancelCrop} />
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog>
    )
}

export default CropImageModal