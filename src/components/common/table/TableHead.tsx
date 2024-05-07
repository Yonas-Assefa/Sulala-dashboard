import Link from 'next/link'
import React from 'react'
import { TableSchema } from '../../../types/table.type'
import TableDelete from './TableDelete'
import TableCheckbox from './TableCheckbox'

type Props = {
    tableSchema: TableSchema
    allItemIds: string[]
}

function TableHead({ tableSchema, allItemIds }: Props) {
    return (
        <thead className='text-black bg-secondary/10'>
            <tr className='border-secondary/30'>
                {
                    tableSchema.include.checkbox &&
                    <TableCheckbox items_id={allItemIds} isHeader />
                }
                {
                    tableSchema.schema.map((schema) => {
                        return (
                            <th>
                                {
                                    !schema.tooltips ?
                                        <p>{schema.title}</p> :
                                        <div className="tooltip tooltip-base" data-tip={schema.tooltips}>
                                            <p className="bg-white text-black cursor-pointer">{schema.title}</p>
                                        </div>
                                }
                            </th>
                        )
                    })
                }
                {tableSchema.include.actions &&
                    tableSchema.include.checkbox &&
                    <TableDelete />
                }
            </tr>
        </thead>
    )
}

export default TableHead