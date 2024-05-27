'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import SecondaryButton from '../ui/SecondaryButton';
import { closeModal } from '@/lib/modals';
import { useDetectClickOutside } from 'react-detect-click-outside';

type Props = {
    id: string
    children: React.ReactNode,
    className?: string
}

function Modal({ children, id, className = 'w-11/12 max-w-sm bg-white px-0' }: Props) {
    const ref = useDetectClickOutside({
        onTriggered: () => closeModal(id),
    });

    return (
        <dialog id={id} className='modal'>
            <div ref={ref} className={`modal-box ${className}`}>
                {children}
            </div>
        </dialog>
    )
}

export default Modal