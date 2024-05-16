import React from 'react'
import { TableSchema } from '../../../types/table.type'
import TableCheckbox from './TableCheckbox'
import TableBadge from './TableBadge'
import TableActions from './TableActions'
import TableDropDown from './TableDropDown'
import { formatNumber } from '@/utils/priceFormatter.util'
import { formatPiece } from '@/utils/pieceFormatter.util'
import { constructImageUrl } from '@/utils/constructImageUrl'

type Props = {
    tableSchema: TableSchema
    mockData: Record<string, any>[]
    reference: Record<string, any> | undefined
}

function TableBody({ tableSchema, mockData, reference }: Props) {
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
                                                            <div className=' w-[30px] h-[40px]  bg-red-600 content-stretch overflow-hidden'>
                                                                <img src={constructImageUrl(product[schema.image_key as keyof typeof product], true)} alt="" className='h-full conten' />
                                                            </div>
                                                        }
                                                        {!schema.referenced ?
                                                            (<p>{schema.type == 'money' ? formatNumber(product_key) : schema.type == 'pieces' ? formatPiece(product_key) : product_key}</p>)
                                                            : <p>{reference?.[schema.reference_key!]?.find(({ value }: { value: string | number }) => value == product_key)?.label}</p>}
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
                                    product_id={product.id}
                                    toggle={tableSchema.include.actions.toggle}
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