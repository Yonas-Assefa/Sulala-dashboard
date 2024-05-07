import React from 'react'

function ImageUnselectButton() {
    return (
        <div className='bg-white absolute active:scale-75 transition-all -top-[8px] -right-[8px] p-1 rounded-full cursor-pointer select-none'>
            <img src="/icons/x.svg" alt="" />
        </div>
    )
}

export default ImageUnselectButton