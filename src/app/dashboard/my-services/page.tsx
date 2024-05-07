import React from 'react'
import ImportServicesModal from './components/modals/ImportServicesModal'
import Table from '@/components/common/table/Table'
import ServiceHead from './components/ServiceHead'
import { servicesFilterData, servicesSortData, serviceData } from './schema/data'
import { serviceTableSchema } from './schema/schema'

function page() {

    return (
        <>
            <ImportServicesModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY SERVICES */}
                <ServiceHead />

                <Table data={serviceData} filterData={servicesFilterData} tableSchema={serviceTableSchema} sortData={servicesSortData} />

            </div >
        </>
    )
}

export default page