'use client'
import React from 'react'
import Link from 'next/link'
import CreateCampaignModal from './components/modals/CreateCampaignModal'
import Table from '@/components/common/table/Table'
import mockData from './components/table/data'
import { tabSchema, tableSchema } from './components/table/schema'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'

function page() {
    const { createQueryString } = useCreateQueryString()

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
                                href={createQueryString('action', 'add-campaign')}
                            >
                                Create campaign
                            </Link>
                        </div>
                    </div>
                </div>

                {/* <PromotionCampaignTable /> */}
                <Table mockData={mockData} tabSchema={tabSchema} tableSchema={tableSchema} />

            </div >
        </>
    )
}

export default page