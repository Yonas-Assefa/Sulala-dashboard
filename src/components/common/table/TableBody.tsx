import React from 'react'
import { ActionOptions, TableSchema } from '../../../types/table.type'
import TableCheckbox from './TableCheckbox'
import TableBadge from './TableBadge'
import TableActions from './TableActions'
import TableDropDown from './TableDropDown'
import { formatNumber } from '@/utils/priceFormatter.util'
import { formatPiece } from '@/utils/pieceFormatter.util'

type Props = {
    tableSchema: TableSchema
    mockData: Record<string, any>[]
    actionOptions?: ActionOptions
}

function TableBody({ tableSchema, mockData, actionOptions }: Props) {
    return (
        <tbody>
            {
                mockData.map((product, index) => {
                    const last_items = index > mockData.length - 3
                    return (
                        <tr className='border-secondary/30' key={product.id}>
                            {
                                tableSchema.include.checkbox &&
                                <TableCheckbox item_id={product.id} />
                            }
                            {
                                tableSchema.schema.map((schema) => {
                                    const product_key = product[schema.key as keyof typeof product];
                                    return (
                                        <td key={schema.key}>
                                            {schema.badge ?

                                                <TableBadge product_key={product_key} schema={schema} last_items={last_items} />
                                                :
                                                schema.dropdown ?
                                                    <TableDropDown items={product_key} label={schema.key} last_items={last_items} /> :

                                                    <div className="flex flex-row gap-3 items-center">
                                                        {
                                                            schema.image &&
                                                            <div className=' w-[30px] h-[40px] content-stretch flex flex-col justify-center'>
                                                                <img src={product[schema.image_key as keyof typeof product]} alt="" className='max-w-[30px] max-h-[30px]' />
                                                            </div>
                                                        }
                                                        {!schema.breadcrumb ?
                                                            (<p>{schema.type == 'money' ? formatNumber(product_key) : schema.type == 'pieces' ? formatPiece(product_key) : product_key}</p>)
                                                            : <div className="max-w-xs text-sm breadcrumbs">
                                                                <ul className='bg-tertiary p-1 rounded-md drop-shadow-sm hover:cursor-pointer'>
                                                                    {
                                                                        Array.isArray(product_key) ? product_key.map((item, index) => {
                                                                            return (
                                                                                <li key={index} className='text-xs text-back'>
                                                                                    <p >{item}</p>
                                                                                </li>
                                                                            )
                                                                        }) : <li>{product_key}</li>
                                                                    }
                                                                </ul>
                                                            </div>}
                                                    </div>
                                            }
                                        </td>
                                    )
                                })
                            }
                            {
                                tableSchema.include.actions &&
                                <TableActions
                                    promote={tableSchema.include.actions.promote}
                                    delete={tableSchema.include.actions.delete}
                                    edit={tableSchema.include.actions.edit}
                                    product={product}
                                    toggle={tableSchema.include.actions.toggle}
                                    actionOptions={actionOptions}
                                />
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default TableBody