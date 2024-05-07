import React from 'react'
import ImportProductsModal from './components/modals/ImportProductsModal'
import Table from '@/components/common/table/Table'
import ProductHead from './components/ProductHead'
import { productData, productsFilterData, productsSortData } from './schema/data'
import { productTableSchema } from './schema/schema'

function page() {

    return (
        <>
            <ImportProductsModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <ProductHead />

                <Table data={productData} filterData={productsFilterData} tableSchema={productTableSchema} sortData={productsSortData} />

            </div >
        </>
    )
}

export default page