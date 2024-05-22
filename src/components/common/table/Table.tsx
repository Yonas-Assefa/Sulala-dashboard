import React, { ReactNode } from 'react'
import DeleteProductModal from '../modal/DeleteModal'
import TableFilter from './TableFilter'
import TableSearch from './TableSearch'
import TableSort from './TableSort'
import TableHead from './TableHead'
import TableBody from './TableBody'
import { Data, SortSchema, FilterData, TableSchema, ActionOptions } from '../../../types/table.type'
import NoItemsFound from '../ui/NoItemsFound'

type Props = {
    filterData: FilterData
    tableSchema: TableSchema
    data: Data
    sortData: SortSchema
    deleteAction?: any
    actionOptions?: ActionOptions
}

function Table({ filterData, tableSchema, data, sortData, deleteAction, actionOptions }: Props) {
    return (
        <>
            <DeleteProductModal deleteAction={deleteAction} />
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
                    {
                        data.length > 0 ?
                            <TableBody mockData={data} tableSchema={tableSchema} actionOptions={actionOptions} /> :
                            <NoItemsFound />
                    }
                </table>
            </div>
        </>
    )
}

export default Table