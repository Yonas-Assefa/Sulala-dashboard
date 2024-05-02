import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import React from 'react'
import PromotionCampaignTable from './components/PromotionCampaignTable'
import Link from 'next/link'
import CreateCampaignModal from './components/modals/CreateCampaignModal'

function page() {

    return (
        <>
            <CreateCampaignModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <div className='flex flex-row justify-between'>
                    <h1 className='text-5xl font-semibold font-serif'>Promotion campaigns</h1>
                    <div className='flex flex-row gap-3 items-center'>
                        <div>
                            <Link
                                className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80`}
                                href={'?action=add-campaign'}
                            >
                                Create campaign
                            </Link>
                        </div>
                    </div>
                </div>

                <PromotionCampaignTable />

            </div >
        </>
    )
}

export default page