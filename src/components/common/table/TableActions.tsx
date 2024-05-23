'use client'
import Link from 'next/link'
import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import { Actions, ActionOptions } from '../../../types/table.type'
import { usePathname } from 'next/navigation'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import { openModal } from '@/lib/modals'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE, FormState } from '@/utils/formStateHelper'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'

type Props = Actions & {
    product: any
    actionOptions?: ActionOptions
}
function TableActions({ edit, delete: deleteItem, promote, product, toggle, actionOptions }: Props) {
    const { createQueryString } = useCreateQueryString()
    const [formState, setFormState] = useState(EMPTY_FORM_STATE)
    const pathname = usePathname()
    const [toggleValue, setToggleValue] = useState({
        checked: product[actionOptions?.toggle?.key as string] == actionOptions?.toggle?.active
    })
    const [optimisticToggleValue, addOptimisticToggleValue] = useOptimistic(
        toggleValue,
        (state, newOptimisticValue: boolean) => {
            return {
                ...state,
                checked: newOptimisticValue
            }
        }
    );
    const [isPending, startTransition] = useTransition();

    useToastMessage(formState)
    useRedirectRoute(formState)

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

    React.useEffect(() => {
        console.log({ message: toggleValue })
        console.log({ optimisticMessages: optimisticToggleValue })
    }, [toggleValue, optimisticToggleValue])

    const handleToogle = async () => {
        addOptimisticToggleValue(!toggleValue.checked)
        startTransition(async () => {
            if (toggle && actionOptions?.toggle) {
                const formData = new FormData()
                const toInclude = actionOptions.toggle.formData || []
                toInclude.map(fd => {
                    formData.append(
                        fd.formDataKey,
                        product[fd.itemKey]
                    )
                })
                actionOptions.toggle.action(formData)
                    .then((res: FormState) => {
                        setFormState(res)
                        if (res.status === 'SUCCESS') {
                            setToggleValue({ checked: !toggleValue.checked })
                        }
                    })
            }
        })
    }

    return (
        <td>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-row gap-2'>
                    {toggle && actionOptions?.toggle &&
                        <div className='flex flex-row gap-2'>
                            <input
                                checked={optimisticToggleValue.checked}
                                disabled={isPending}
                                onChange={handleToogle}
                                type="checkbox"
                                className="transition-all toggle [--tglbg:lightgray] checked:[--tglbg:green] bg-white hover:bg-white border-[#d3d3d3] checked:border-[#218000]" />
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