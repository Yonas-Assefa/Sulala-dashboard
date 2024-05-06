import Link from 'next/link'
import React from 'react'

type Props = {
    edit: boolean
    delete: boolean
    promote: boolean
    product_id: string
}
function TableActions({ edit, delete: deleteItem, promote, product_id }: Props) {
    return (
        <td>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-row gap-2'>
                    {edit &&
                        <Link href={`?item=${product_id}&action=delete-product`}>
                            <img src="/icons/edit.svg" alt="" />
                        </Link>
                    }
                    {deleteItem &&
                        <Link href={`?item=${product_id}&action=delete-product`}>
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