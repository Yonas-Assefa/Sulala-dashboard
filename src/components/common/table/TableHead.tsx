import Link from 'next/link'
import React from 'react'
import { TableSchema } from './table.type'
import TableDelete from './TableDelete'

type Props = {
    tableSchema: TableSchema
}

function TableHead({ tableSchema }: Props) {
    return (
        <thead className='text-black'>
            <tr className='border-secondary/30'>
                {
                    tableSchema.include.checkbox && <th>
                        <label>
                            <input type="checkbox" className="checkbox checkbox-success" />
                        </label>
                    </th>
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
                {tableSchema.include.checkbox &&
                    <TableDelete />
                }
            </tr>
        </thead>
    )
}

export default TableHead