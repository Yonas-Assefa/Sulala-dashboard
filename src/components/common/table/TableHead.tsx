import Link from 'next/link'
import React from 'react'
import { TableSchema } from './table.type'

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
                    <th>
                        <div className="flex flex-row items-center justify-between">
                            <p>Actions </p>
                            <Link href={'?item=all&action=delete-product'}>
                                <img src="/icons/delete_red.svg" alt="" />
                            </Link>
                        </div>
                    </th>
                }
            </tr>
        </thead>
    )
}

export default TableHead