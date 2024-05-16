import React from 'react'
import ImportProductsModal from './components/modals/ImportProductsModal'
import Table from '@/components/common/table/Table'
import ProductHead from './components/ProductHead'
import { productData, productsFilterData, productsSortData } from './schema/data'
import { productTableSchema } from './schema/schema'
import { getProducts } from '@/actions/products/get-products'
import { getCategories } from '@/actions/common/get-categories'

async function page() {

    const products = await getProducts()
    const categories = (await getCategories()).map((category: any) => {
        return {
            label: category.name,
            value: category.id
        }
    })
    return (
        <>
            <ImportProductsModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

                {/* HEADER FOR MY PRODUCTS */}
                <ProductHead />

                <Table data={products.results} filterData={productsFilterData} tableSchema={productTableSchema} sortData={productsSortData} reference={{ categories }} />

            </div >
        </>
    )
}

export default page