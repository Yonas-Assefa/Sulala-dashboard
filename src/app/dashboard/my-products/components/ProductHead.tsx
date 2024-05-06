'use client'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'

function ProductHead() {
    const { createQueryString } = useCreateQueryString()
    return (
        <div className='flex flex-row justify-between'>
            <h1 className='text-5xl font-semibold font-serif'>My Products</h1>
            <div className='flex flex-row gap-3'>
                <div>
                    <SecondaryButton name='Import' href={createQueryString('action', 'import')} padding='sm' />
                </div>
                <div>
                    <SecondaryButton name='Export' href='' padding='sm' />
                </div>
                <div>
                    <Link
                        className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80`}
                        href={'/dashboard/my-products/add-product'}
                    >
                        Add Product
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default ProductHead