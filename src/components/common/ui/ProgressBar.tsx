import React from 'react'

function ProgressBar({ value }: { value: number }) {
    return (
        <div className='h-[8px] w-1/3 bg-tertiary rounded-full'>
            <div className={`h-[8px] bg-primary rounded-full ${value ? 'w-[' + value + '%]' : 'w-0'}`}></div>
        </div>
    )
}

export default ProgressBar