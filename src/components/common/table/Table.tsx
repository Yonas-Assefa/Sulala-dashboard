'use client'
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import DeleteProductModal from '../modal/DeleteModal'
import TableTab from './TableTab'
import TableSearch from './TableSearch'
import TableFilter from './TableFilter'
import TableBadge from './TableBadge'
import TableActions from './TableActions'

type TabSchema = string[]
type TableSchema = {
    include: {
        checkbox: boolean
        actions: {
            edit: boolean
            delete: boolean
            promote: boolean
        }
    }
    schema: {
        key: string
        title: string
        type: string
        badge?: boolean
        schema_colors?: Record<string, string>
        image?: boolean
        image_key?: string
    }[]
}

type Props = {
    tabSchema: TabSchema
    tableSchema: TableSchema
    mockData: Record<string, any>[]
}

function Table({ tabSchema, tableSchema, mockData }: Props) {
    const searchParams = useSearchParams()

    return (
        <>
            <DeleteProductModal open={searchParams.get('action') === 'delete-product'} item={searchParams.get('item')} />
            <div className="overflow-x-auto border rounded-[20px]">
                <div className='flex justify-between p-3 items-center'>
                    <div className='flex items-center gap-4'>
                        <TableTab tabSchema={tabSchema} />
                        <TableSearch />
                    </div>
                    <TableFilter />
                </div>
                <table className="table">
                    {/* head */}
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
                                            <p>{schema.title}</p>
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
                    <tbody>
                        {
                            mockData.map((product) => {

                                return (
                                    <tr className='border-secondary/30'>
                                        {
                                            tableSchema.include.checkbox && <td>
                                                <label>
                                                    <input type="checkbox" className="checkbox checkbox-success" />
                                                </label>
                                            </td>
                                        }
                                        {
                                            tableSchema.schema.map((schema) => {
                                                const product_key = product[schema.key as keyof typeof product];
                                                return (
                                                    <td>
                                                        {schema.badge ?
                                                            <div className='flex'>
                                                                <TableBadge product_key={product_key} schema={schema} />
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
                                                product_id={product.id} />
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default Table