import React from 'react'
import CreateCampaignModal from './components/modals/CreateCampaignModal'
import Table from '@/components/common/table/Table'
import { promotionData, promotionFilterData, promotionSortData } from './schema/data'
import { promotionTableSchema } from './schema/schema'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { getPromotions } from '@/actions/promotion/get-promotions'
import { updatePromotionStatus } from '@/actions/promotion/update-promotion-status'
import { deletePromotion } from '@/actions/promotion/delete-promotion'
import { TableProps as Props } from '@/types/props.type'
import { changeObjToFormData } from '@/lib/helper'
import { promotionData as reviews } from './schema/data'


async function page({ searchParams: { search, filter, sort, sort_by } }: Props) {

    // const promotions = await getPromotions(changeObjToFormData({ search, filter, sort, sort_by }))

    return (
        <>
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl md:text-4xl font-semibold font-serif'>Approve / Reject </h1>
                </div>

                {/* <PromotionCampaignTable /> */}
                <Table
                    data={reviews}
                    filterData={promotionFilterData}
                    tableSchema={promotionTableSchema}
                    sortData={promotionSortData}
                    actionOptions={{
                        search: {
                            action: getPromotions,
                        }
                    }}
                />

            </div >
        </>
    )
}

export default page