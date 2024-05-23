'use client'
import React from 'react'

function error() {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='bg-white flex-grow'>
                <div className='w-full h-full flex justify-between flex-col items-center'>
                    <div className='flex flex-col justify-center items-center w-full h-full'>
                        <img src="/icons/alert.svg" alt="" className='opacity-80' />
                        <h1 className='text-4xl font-semibold text-danger'>Error - While loading promotions</h1>
                        <div className='flex flex-row justify-between gap-5'>
                            <a href='mailto:support@sulala.com' className='text-primary font-semibold hover:underline'>Please contact support team!</a>
                        </div>
                        <img src='/icons/whatshot.svg' className='w-[100px] opacity-15 absolute' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default error