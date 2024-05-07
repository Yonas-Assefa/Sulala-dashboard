import React from 'react'
import ImportServicesModal from './components/modals/ImportServicesModal'
import Table from '@/components/common/table/Table'
import ServiceHead from './components/ServiceHead'
import { ServicesFilterData, ServicesSortData, serviceData } from './components/table/data'
import { ServiceTableSchema } from './components/table/schema'

function page() {

    return (
        <>
            <ImportServicesModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY SERVICES */}
                <ServiceHead />

                <Table data={serviceData} filterData={ServicesFilterData} tableSchema={ServiceTableSchema} sortData={ServicesSortData} />

            </div >
        </>
    )
}

export default page