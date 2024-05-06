import React from 'react'
import { TableSchema } from './table.type'
import TableCheckbox from './TableCheckbox'
import TableBadge from './TableBadge'
import TableActions from './TableActions'

type Props = {
    tableSchema: TableSchema
    mockData: Record<string, any>[]
}
function TableBody({ tableSchema, mockData }: Props) {
    return (
        <tbody>
            {
                mockData.map((product, index) => {
                    const last_items = index > mockData.length - 3

                    return (
                        <tr className='border-secondary/30'>
                            {
                                tableSchema.include.checkbox &&
                                <TableCheckbox />
                            }
                            {
                                tableSchema.schema.map((schema) => {
                                    const product_key = product[schema.key as keyof typeof product];
                                    return (
                                        <td>
                                            {schema.badge ?
                                                <div className='flex'>
                                                    <TableBadge product_key={product_key} schema={schema} last_items={last_items} />
                                                </div> :

                                                <div className="flex flex-row items-center">
                                                    {schema.image && <img src={product[schema.image_key as keyof typeof product]} alt="" />}
                                                    <p>{product_key}</p>
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