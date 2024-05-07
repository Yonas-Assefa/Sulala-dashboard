import React from 'react'
import ImportProductsModal from './components/modals/ImportProductsModal'
import Table from '@/components/common/table/Table'
import mockData from './components/table/data'
import { tabSchema, tableSchema } from './components/table/schema'
import ProductHead from './components/ProductHead'

function page() {

    return (
        <>
            <ImportProductsModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <ProductHead />

                <Table mockData={mockData} tabSchema={tabSchema} tableSchema={tableSchema} />

            </div >
        </>
    )
}

export default page