import React from 'react'

function NoItemsFound() {
    return (
        <tbody className='w-full'>
            <tr className='w-full bg-tertiary'>
                <td className='w-full' colSpan={100}>
                    <div className='flex relative flex-col w-full justify-center h-[300px] items-center'>
                        <img src='/icons/inbox.svg' className='w-[200px] absolute opacity-5' />
                        <p className='text-secondary font-semibold'>No items found here!</p>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default NoItemsFound