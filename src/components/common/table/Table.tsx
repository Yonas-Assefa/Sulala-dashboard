import React, { ReactNode } from 'react'
import DeleteProductModal from '../modal/DeleteModal'
import TableTab from './TableTab'
import TableSearch from './TableSearch'
import TableFilter from './TableFilter'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { MockData, TabSchema, TableSchema } from './table.type'

type Props = {
    tabSchema: TabSchema
    tableSchema: TableSchema
    mockData: MockData
}

function Table({ tabSchema, tableSchema, mockData }: Props) {
    return (
        <>
            <DeleteProductModal />
            <div className="overflow-x-auto border rounded-[20px]">
                <div className='flex justify-between p-3 items-center'>
                    <div className='flex items-center gap-4'>
                        <TableTab tabSchema={tabSchema} />
                        <TableSearch />
                    </div>
                    <TableFilter />
                </div>
                <table className="table">
                    <TableHead tableSchema={tableSchema} />
                    <TableBody mockData={mockData} tableSchema={tableSchema} />
                </table>
            </div>
        </>
    )
}

export default Table