import BackButton from '@/components/common/ui/BackButton'
import React from 'react'
import { notFound } from 'next/navigation'
import ProductForm from './ProductForm'
import { getCategories } from '@/actions/auth/get-categories'

type Props = {
    params: {
        tab: string
    }
}

async function page({ params: { tab } }: Props) {

    if (!['add', 'edit'].includes(tab)) {
        return notFound()
    }

    const categoryLists = await getCategories()

    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll'>
            <div className='flex flex-row font-semibold justify-start items-center gap-6 text-3xl font-serif'>
                <div className='mt-4' >
                    <BackButton />
                </div>
                <h2 className='capitalize'>{tab} Product</h2>
            </div>
            <ProductForm categoryLists={categoryLists} />
        </div>
    )
}

export default page