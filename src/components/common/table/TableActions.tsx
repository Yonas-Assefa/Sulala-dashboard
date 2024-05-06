import Link from 'next/link'
import React from 'react'
import { Actions } from './table.type'

type Props = Actions & {
    product_id: string
}
function TableActions({ edit, delete: deleteItem, promote, product_id, toggle }: Props) {
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