import React from 'react'
import Table from '@/components/common/table/Table'
import { promotionFilterData, promotionSortData } from './schema/data'
import { promotionTableSchema } from './schema/schema'
import { TableProps as Props } from '@/types/props.type'
import { changeObjToFormData } from '@/lib/helper'
import { getPendingShops } from '@/actions/manage-shops/get-pending-shops'


async function page({ searchParams: { search, filter, sort, sort_by } }: Props) {

    const pendingShops: any = await getPendingShops(changeObjToFormData({ search, filter, sort, sort_by }))

    return (
        <>
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl md:text-4xl font-semibold font-serif'>Manage shops </h1>
                </div>

                {/* <PromotionCampaignTable /> */}
                <Table
                    data={pendingShops}
                    filterData={promotionFilterData}
                    tableSchema={promotionTableSchema}
                    sortData={promotionSortData}
                    actionOptions={{

                    }}
                />

            </div >
        </>
    )
}

export default page