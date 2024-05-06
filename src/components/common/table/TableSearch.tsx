import React from 'react'

function TableSearch() {
    return (
        <div className="border flex flex-row gap-1 p-1 rounded-[30px]">
            <img src="/icons/search.svg" alt="" />
            <input type="text" className='bg-white outline-none border-0 focus:outline-none focus:border-0' placeholder='Seach my products' />
        </div>
    )
}

export default TableSearch