import React from 'react'
type Props = {
    label: string
}

function DateInput({ label }: Props) {
    return (
        <div>
            <p>{label}</p>
            <div className='flex flex-row p-2 gap-2 w-full flex-wrap'>
                <div className='border rounded-[30px] bg-white py-2 px-4 flex flex-row justify-between gap-3'>
                    <input type="date" name="" id="date" className='bg-transparent border-0 outline-none max-w-[150px]' placeholder='DD.MM.YYYY' />
                    <label htmlFor="date"><img src="/icons/calendar.svg" alt="" /></label>
                </div>
                <div className='border rounded-[30px] bg-white py-2 px-4 flex flex-row justify-between gap-3'>
                    <input type="time" name="" id="" className='bg-transparent border-0 outline-none max-w-[150px]' placeholder='00 : 00 AM' />
                    <img src="/icons/watch.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default DateInput