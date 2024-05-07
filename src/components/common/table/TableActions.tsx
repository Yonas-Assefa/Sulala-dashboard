'use client'
import Link from 'next/link'
import React from 'react'
import { Actions } from '../../../types/table.type'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'

type Props = Actions & {
    product_id: string
}
function TableActions({ edit, delete: deleteItem, promote, product_id, toggle }: Props) {
    const { createQueryString } = useCreateQueryString()

    return (
        <td>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-row gap-2'>
                    {toggle &&
                        <div className='flex flex-row gap-2'>
                            <input type="checkbox" className="toggle [--tglbg:lightgray] checked:[--tglbg:green] bg-white hover:bg-white border-[#d3d3d3] checked:border-[#218000]" />
                        </div>
                    }
                    {edit &&
                        <Link href={createQueryString([{ key: 'item', value: product_id }, { key: 'action', value: 'edit-product' }])}>
                            <img src="/icons/edit.svg" alt="" />
                        </Link>
                    }
                    {deleteItem &&
                        <Link href={createQueryString([{ key: 'item', value: product_id }, { key: 'action', value: 'delete-product' }])}>
                            <img src="/icons/delete.svg" alt="" />
                        </Link>
                    }
                </div>
                {promote &&
                    <div className='flex flex-row gap-2'>
                        <img src="/icons/whatshot_green.svg" alt="" />
                        <p className='text-primary font-semibold'>Promote</p>
                    </div>
                }
            </div>
        </td>
    )
}

export default TableActions