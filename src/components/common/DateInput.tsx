import React from 'react'

type Props = {
    label: string
}

function DateInput({ label }: Props) {
    return (
        <div>
            <p>{label}</p>
            <div className='flex flex-row p-2 gap-2'>
                <div className='border rounded-[30px] bg-white py-2 px-4 flex flex-row'>
                    <input type="text" name="" id="" className='bg-transparent border-0 outline-none' placeholder='DD.MM.YYYY' />
                    <img src="/icons/calendar.svg" alt="" />
                </div>
                <div className='border rounded-[30px] bg-white py-2 px-4 flex flex-row'>
                    <input type="text" name="" id="" className='bg-transparent border-0 outline-none' placeholder='00 : 00 AM' />
                    <img src="/icons/watch.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default DateInput