import SecondaryButton from '@/components/common/ui/SecondaryButton'
import React from 'react'
import Link from 'next/link'
import ImportServicesModal from './components/modals/ImportServicesModal'
import Table from '@/components/common/table/Table'
import mockData from './components/table/data'
import { tabSchema, tableSchema } from './components/table/schema'

function page() {

    return (
        <>
            <ImportServicesModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <div className='flex flex-row justify-between'>
                    <h1 className='text-5xl font-semibold font-serif'>My Services</h1>
                    <div className='flex flex-row gap-3 items-center'>
                        <div className='flex flex-row gap-4'>
                            <img src="/icons/clock.svg" alt="" />
                            <p>Mon-Fri 8:00 AM - 5:00 PM</p>
                        </div>
                        <div>
                            <SecondaryButton name='Edit worktime' href='?action=edit-worktime' padding='sm' />
                        </div>
                        <div>
                            <Link
                                className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80`}
                                href={'/dashboard/my-services/add-service'}
                            >
                                Add Service
                            </Link>
                        </div>
                    </div>
                </div>

                <Table mockData={mockData} tabSchema={tabSchema} tableSchema={tableSchema} />

            </div >
        </>
    )
}

export default page