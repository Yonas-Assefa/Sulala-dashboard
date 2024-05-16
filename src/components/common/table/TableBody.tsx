import React from 'react'
import { TableSchema } from '../../../types/table.type'
import TableCheckbox from './TableCheckbox'
import TableBadge from './TableBadge'
import TableActions from './TableActions'
import TableDropDown from './TableDropDown'
import { formatNumber } from '@/utils/priceFormatter.util'
import { formatPiece } from '@/utils/pieceFormatter.util'

type Props = {
    tableSchema: TableSchema
    mockData: Record<string, any>[]
    reference: Record<string, any> | undefined
}
const NEXT_BACKEND_BASE_URL = process.env.NEXT_BACKEND_BASE_URL

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
                                    const image_obj = product[schema.image_key as keyof typeof product]
                                    const image_base_url = NEXT_BACKEND_BASE_URL?.endsWith('/') ? NEXT_BACKEND_BASE_URL.slice(0, -1) : NEXT_BACKEND_BASE_URL
                                    const image_link = `${image_base_url}${Array.isArray(image_obj) ? image_obj[0] : image_obj}`
                                    console.log({ image_link, product, image_key: schema })
                                    return (
                                        <td key={schema.key}>
                                            {schema.badge ?

                                                <TableBadge product_key={product_key} schema={schema} last_items={last_items} />
                                                :
                                                schema.dropdown ?
                                                    <TableDropDown items={product_key} label={schema.key} last_items={last_items} /> :

                                                    <div className="flex flex-row items-center">
                                                        {schema.image && <img src={image_link} alt="" />}
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