import React from 'react'

type Props = {
    params: {
        tab: string[]
    }
}

function PersonalInfo({ params: { tab } }: Props) {

    console.log({ tab })
    return (
        <div className='text-black'>PersonalInfo</div>
    )
}

export default PersonalInfo