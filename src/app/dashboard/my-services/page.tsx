import SecondaryButton from '@/components/common/ui/SecondaryButton'
import React from 'react'
import Link from 'next/link'
import ImportServicesModal from './components/modals/ImportServicesModal'
import Table from '@/components/common/table/Table'
import mockData from './components/table/data'
import { tabSchema, tableSchema } from './components/table/schema'
import ServiceHead from './components/ServiceHead'

function page() {

    return (
        <>
            <ImportServicesModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY SERVICES */}
                <ServiceHead />

                <Table mockData={mockData} tabSchema={tabSchema} tableSchema={tableSchema} />

            </div >
        </>
    )
}

export default page