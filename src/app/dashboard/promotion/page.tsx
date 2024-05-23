import React from 'react'
import CreateCampaignModal from './components/modals/CreateCampaignModal'
import Table from '@/components/common/table/Table'
import { promotionData, promotionFilterData, promotionSortData } from './schema/data'
import { promotionTableSchema } from './schema/schema'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { getPromotions } from '@/actions/promotion/get-promotions'
import { updatePromotionStatus } from '@/actions/promotion/update-promotion-status'

async function page() {

    const promotions = await getPromotions()

    return (
        <>
            <CreateCampaignModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <div className='flex flex-row justify-between'>
                    <h1 className='text-5xl font-semibold font-serif'>Promotion campaigns</h1>
                    <div className='flex flex-row gap-3 items-center'>
                        <div>
                            <PrimaryButton name='Create campaign' modal='create_campaign_modal' />
                        </div>
                    </div>
                </div>

                {/* <PromotionCampaignTable /> */}
                <Table
                    data={promotions}
                    filterData={promotionFilterData}
                    tableSchema={promotionTableSchema}
                    sortData={promotionSortData}
                    actionOptions={{
                        edit: {
                            searchParams: [
                                {
                                    key: 'tab',
                                    fromItem: {
                                        itemKey: 'promotion_type',
                                        valueDict: [
                                            { key: 'DISCOUNT', value: 'discounts-ads' },
                                            { key: 'BANNER', value: 'banner-ads' },
                                        ]
                                    }
                                },
                                { key: 'type', value: 'product' },
                                {
                                    key: 'item',
                                    fromItem: {
                                        itemKey: 'id'
                                    }
                                },
                            ]
                        },
                        toggle: {
                            action: updatePromotionStatus,
                            key: 'status',
                            active: 'ACTIVE',
                            formData: [
                                { formDataKey: 'status', itemKey: 'status' },
                                { formDataKey: 'item_id', itemKey: 'id' },
                            ]
                        }
                    }}
                />

            </div >
        </>
    )
}

export default page