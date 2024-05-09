import React from 'react'

type Props = {
    title: string
    description: string
}
function SummaryDescription({ title, description }: Props) {
    return (
        <div className='flex flex-col gap-3 p-2'>
            <h4 className='text-lg font-semibold'>{title}</h4>
            <p>{description}</p>
        </div>
    )
}

export default SummaryDescription