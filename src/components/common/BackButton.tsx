'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function BackButton({ onClick }: { onClick?: () => void }) {
    const router = useRouter()
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            router.back()
        }
    }
    return (
        <div className='flex w-full mb-4'>
            <button className='bg-tertiary hover:bg-primary/20 p-2 rounded-full btn border-0' onClick={handleClick}>
                <img src="/icons/arrow-left.svg" alt="" className='w-[30px]' />
            </button>
        </div>
    )
}

export default BackButton