'use client'
import React from 'react'

function error() {
    return (
        <div className='w-screen h-screen flex flex-row'>
            <div className='bg-white flex-grow'>
                <div className='flex flex-col justify-center items-center w-full h-full'>
                    <img src="/icons/alert.svg" alt="" className='opacity-95' />
                    <h1 className='text-xl md:text-2xl text-center font-semibold text-danger'>We're sorry, we're having some trouble loading the page right now {':('}</h1>
                    <div className='flex flex-row justify-between gap-5'>
                        <p className='text-primary font-semibold'>We're working on a fix and will get things back to normal as soon as possible!</p>
                    </div>
                    <p className='text-secondary font-semibold'>In the meantime, you can try refreshing the page later.</p>
                    <img src='/sulala-logo.svg' className=' w-[100px] opacity-15 absolute' />
                </div>
            </div>
        </div>
    )
}

export default error