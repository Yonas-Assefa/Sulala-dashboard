'use client'
import Link from 'next/link'
import React from 'react'
import { Actions, ActionOptions } from '../../../types/table.type'
import { usePathname } from 'next/navigation'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { openModal } from '@/lib/modals'

type Props = Actions & {
    product: any
    actionOptions?: ActionOptions
}
function TableActions({ edit, delete: deleteItem, promote, product, toggle, actionOptions }: Props) {
    const { createQueryString } = useCreateQueryString()
    const pathname = usePathname()

    const getEditLink = () => {
        let link: string

        if (actionOptions && actionOptions.edit) {
            if (actionOptions.edit.params) {
                link = actionOptions.edit.params.absolute ?
                    actionOptions.edit.params.value :
                    pathname + actionOptions.edit.params.value
            } else {
                link = pathname + '/edit/'
            }
            if (actionOptions.edit.searchParams) {
                const searchParams = actionOptions.edit.searchParams.map((ele) => {
                    if (ele.value && typeof ele.value === 'string') return { key: ele.key, value: ele.value }
                    else if (ele.fromItem) {
                        if (ele.fromItem.valueDict && ele.fromItem.valueDict.length > 0 && ele.fromItem.itemKey && typeof ele.fromItem.itemKey == 'string') {
                            const product_key = product[ele.fromItem.itemKey as keyof typeof product] as string
                            const itemValue = ele.fromItem.valueDict?.find(dict => dict.key == product_key)?.value || ''
                            return {
                                key: ele.key,
                                value: itemValue
                            }
                        } else {
                            return {
                                key: ele.key,
                                value: product[ele.fromItem.itemKey as keyof typeof product] as string
                            }
                        }
                    } else {
                        return {
                            key: '',
                            value: ''
                        }
                    }
                })
                link = link + createQueryString(searchParams)
            } else {
                link = link + createQueryString([{ key: 'item', value: product.id }, { key: 'type', value: 'product' }])
            }

            return link
        }

        return pathname + '/edit/' + createQueryString([{ key: 'item', value: product.id }, { key: 'type', value: 'product' }])
    }

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
                        <Link href={getEditLink()}>
                            <img src="/icons/edit.svg" alt="" />
                        </Link>
                    }
                    {deleteItem &&
                        <Link href={createQueryString([{ key: 'item', value: product.id }])} onClick={() => openModal('delete_item_table_modal')}>
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