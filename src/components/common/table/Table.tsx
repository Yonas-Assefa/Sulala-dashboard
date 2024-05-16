import React, { ReactNode } from 'react'
import DeleteProductModal from '../modal/DeleteModal'
import TableFilter from './TableFilter'
import TableSearch from './TableSearch'
import TableSort from './TableSort'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { Data, SortSchema, FilterData, TableSchema } from '../../../types/table.type'

type Props = {
    filterData: FilterData
    tableSchema: TableSchema
    data: Data
    sortData: SortSchema
    reference?: Record<string, any>
}

function Table({ filterData, tableSchema, data, sortData, reference }: Props) {
    return (
        <>
            <DeleteProductModal />
            <div className="overflow-x-auto border rounded-[20px]">
                <div className='flex justify-between p-3 items-center'>
                    <div className='flex items-center gap-4'>
                        <TableFilter filterData={filterData} />
                        <TableSearch />
                    </div>
                    <TableSort sortData={sortData} />
                </div>
                <table className="table">
                    <TableHead tableSchema={tableSchema} allItemIds={data.map(prod => prod.id + '')} />
                    <TableBody mockData={data} tableSchema={tableSchema} reference={reference} />
                </table>
            </div>
        </>
    )
}

export default Table