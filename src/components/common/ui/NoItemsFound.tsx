import { useTranslations } from 'next-intl'
import React from 'react'

function NoItemsFound() {
    const t = useTranslations('Commons')
    return (
        <tbody className='w-full'>
            <tr className='w-full bg-tertiary'>
                <td className='w-full' colSpan={100}>
                    <div className='flex relative flex-col w-full justify-center h-[300px] items-center'>
                        <img src='/icons/inbox.svg' className='w-[200px] absolute opacity-5' />
                        <p className='text-secondary font-semibold'>{t('no_items_found_here')}</p>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default NoItemsFound