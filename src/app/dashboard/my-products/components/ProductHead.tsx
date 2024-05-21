'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { openModal } from '@/lib/modals'
import Link from 'next/link'
import React from 'react'

function ProductHead() {

    return (
        <div className='flex flex-row justify-between'>
            <h1 className='text-5xl font-semibold font-serif'>My Products</h1>
            <div className='flex flex-row gap-3'>
                <div>
                    <SecondaryButton name='Import' modal='import_products_modal' padding='sm' />
                </div>
                <div>
                    <SecondaryButton name='Export' href='' padding='sm' />
                </div>
                <div>
                    <PrimaryButton name='Add Product' href='/dashboard/my-products/add' />
                </div>
            </div>
        </div>

    )
}

export default ProductHead