import React from 'react'

function TableFilter() {
    return (
        <div className='flex flex-row gap-2 '>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="bg-white border rounded-[30px] p-1 px-3 flex flex-row gap-2">
                    <img src="/icons/swap_vert.svg" alt="" />
                    <p>Sort by date: <span>Newest</span></p>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-white border rounded-box w-52">
                    <p className='text-black font-semibold'>Sort by</p>
                    <div className='flex flex-col gap-3 p-2'>
                        <label htmlFor='radio-1' className='flex flex-row gap-2 items-center cursor-pointer'>
                            <input type="radio" name="radio-5" id='radio-1' className="radio radio-success border-secondary" />
                            <p>Date</p>
                        </label>
                        <label htmlFor='radio-2' className='flex flex-row gap-2 items-center cursor-pointer'>
                            <input type="radio" name="radio-5" id='radio-2' className="radio radio-success border-secondary" />
                            <p>Product title</p>
                        </label>
                        <label htmlFor='radio-3' className='flex flex-row gap-2 items-center cursor-pointer'>
                            <input type="radio" name="radio-5" id='radio-3' className="radio radio-success border-secondary" />
                            <p>Created</p>
                        </label>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default TableFilter