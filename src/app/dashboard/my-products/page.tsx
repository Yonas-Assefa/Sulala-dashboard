import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import React from 'react'
import MyProductsTable from './components/MyProductsTable'
import Link from 'next/link'

function page() {
    return (
        <div className='text-black flex flex-col w-full h-full p-8 gap-10'>

            {/* HEADER FOR MY PRODUCTS */}
            <div className='flex flex-row justify-between'>
                <h1 className='text-5xl font-semibold font-serif'>My Products</h1>
                <div className='flex flex-row gap-3'>
                    <div>
                        <SecondaryButton name='Import' href='' padding='sm' />
                    </div>
                    <div>
                        <SecondaryButton name='Import' href='' padding='sm' />
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

            <MyProductsTable />

        </div >
    )
}

export default page