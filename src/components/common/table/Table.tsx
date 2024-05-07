import React, { ReactNode } from 'react'
import DeleteProductModal from '../modal/DeleteModal'
import TableFilter from './TableFilter'
import TableSearch from './TableSearch'
import TableSort from './TableSort'
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
                        <TableFilter tabSchema={tabSchema} />
                        <TableSearch />
                    </div>
                    <TableSort />
                </div>
                <table className="table">
                    <TableHead tableSchema={tableSchema} allItemIds={mockData.map(prod => prod.id + '')} />
                    <TableBody mockData={mockData} tableSchema={tableSchema} />
                </table>
            </div>
        </>
    )
}

export default Table