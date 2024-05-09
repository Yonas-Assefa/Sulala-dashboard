import React from 'react'
import SideBarNav from './dashboard/components/SideBarNav';

function NotFoundPage() {
    return (
        <div className='w-screen h-screen flex flex-row'>
            <SideBarNav />
            <div className='bg-white flex-grow'>
                <div className='w-full h-full flex justify-between flex-col items-center'>
                    <div className='flex justify-center items-center w-full h-full'>
                        <h1 className='text-4xl font-semibold text-primary'>404 - Page Not Found</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage