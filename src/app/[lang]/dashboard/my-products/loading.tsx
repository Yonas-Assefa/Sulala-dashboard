import React from 'react'

function loading() {
    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-3 overflow-y-scroll'>

            <div className="w-[200px] mt-16 mb-4 h-8 bg-gray-300 rounded animate-pulse"></div>
            <div className='flex flex-start gap-3'>
                <div className="w-[100px] h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-[100px] h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-[100px] h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <p className="h-4 bg-gray-200 rounded-full  w-[300px] animate-pulse"></p>

            <ul className="mt-5 space-y-3 animate-pulse">
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
            </ul>

            <p className="h-4 bg-gray-200 rounded-full  w-[300px] animate-pulse"></p>

            <ul className="mt-5 space-y-3 animate-pulse">
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
            </ul>

            <p className="h-4 bg-gray-200 rounded-full  w-[300px] animate-pulse"></p>

            <ul className="mt-5 space-y-3 animate-pulse">
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
                <li className="w-full h-4 bg-gray-200 rounded-full "></li>
            </ul>

            <div className='flex flex-col gap-3 mt-20'>
                <div className="w-[400px] h-8 bg-gray-200 rounded-[40px] animate-pulse"></div>
                <div className="w-[200px] h-8 bg-gray-200 rounded-[40px] animate-pulse"></div>
                <div className="w-[100px] h-8 bg-gray-200 rounded-[40px] animate-pulse"></div>
            </div>

        </div>
    )
}

export default loading