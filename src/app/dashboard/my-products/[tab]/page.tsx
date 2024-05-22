import BackButton from '@/components/common/ui/BackButton'
import React from 'react'
import { notFound } from 'next/navigation'
import ProductForm from './ProductForm'
import { getCategories } from '@/actions/common/get-categories'
import { getOneProduct } from '@/actions/products/get-products'
import { getProductTags } from '@/actions/common/get-product-tags'

type Props = {
    params: {
        tab: string
    },
    searchParams: {
        item: string
    }
}

async function page({ params: { tab }, searchParams: { item } }: Props) {

    if (!['add', 'edit'].includes(tab)) {
        return notFound()
    }

    const categoryLists = await getCategories()
    const productTags = await getProductTags()
    const product = item ? await getOneProduct(item) : null

    console.log({ product })

    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize'>{tab} Product</h2>
            </div>
            <ProductForm categoryLists={categoryLists} productTags={productTags} initialValue={product} tab={tab} />
        </div>
    )
}

export default page