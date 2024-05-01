'use client'
import React from 'react'
import mockData, { productStatusColors } from '../data'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import DeleteServiceModal from './modals/DeleteServiceModal'

function MyServicesTable() {
    const searchParams = useSearchParams()

    return (
        <>
            <DeleteServiceModal open={searchParams.get('action') == 'delete-service'} item={searchParams.get('item')} />
            <div className="overflow-x-auto border rounded-[20px]">
                <div className='flex justify-between p-3 items-center'>
                    <div className='flex items-center gap-4'>
                        <div role="tablist" className="tabs">
                            {
                                ['all', 'active', 'draft', 'archived'].map((filter) => {
                                    return (
                                        <Link href={`?filter=${filter}`} role="tab" className={`tab capitalize rounded-[30px] bg-white text-black ${searchParams.get('filter') === filter ? 'tab-active' : ''} bg-white text-black`}>{filter}</Link>
                                    )
                                })
                            }
                        </div>
                        <div className="border flex flex-row gap-1 p-1 rounded-[30px]">
                            <img src="/icons/search.svg" alt="" />
                            <input type="text" className='bg-white outline-none border-0 focus:outline-none focus:border-0' placeholder='Seach by name or id' />
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 '>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="bg-white border rounded-[30px] p-1 px-3 flex flex-row gap-2">
                                <img src="/icons/swap_vert.svg" alt="" />
                                <p>Sort by date: <span>Newest</span></p>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-white border rounded-box w-52">
                                <p className='text-black font-semibold'>Sort by</p>
                                <div className='flex flex-col gap-3 p-2'>
                                    <label htmlFor='radio-1' className='flex flex-row gap-2 items-center cursor-pointer'>
                                        <input type="radio" name="radio-5" id='radio-1' className="radio radio-success border-secondary" />
                                        <p>Date</p>
                                    </label>
                                    <label htmlFor='radio-2' className='flex flex-row gap-2 items-center cursor-pointer'>
                                        <input type="radio" name="radio-5" id='radio-2' className="radio radio-success border-secondary" />
                                        <p>Product title</p>
                                    </label>
                                    <label htmlFor='radio-3' className='flex flex-row gap-2 items-center cursor-pointer'>
                                        <input type="radio" name="radio-5" id='radio-3' className="radio radio-success border-secondary" />
                                        <p>Created</p>
                                    </label>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <table className="table">
                    {/* head */}
                    <thead className='text-black'>
                        <tr className='border-secondary/30'>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>№</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Upload date</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>
                                <div className="flex flex-row items-center justify-between">
                                    <p>Actions </p>
                                    <Link href={'?item=all&action=delete-service'}>
                                        <img src="/icons/delete_red.svg" alt="" />
                                    </Link>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mockData.map((product) => {
                                return (
                                    <tr className='border-secondary/30'>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <p>{product.id}</p>
                                        </td>
                                        <td>
                                            <div className="flex flex-row items-center">
                                                <p>{product.service.name}</p>
                                            </div>
                                        </td>
                                        <td className='flex justify-start items-center'>
                                            <div className={`flex gap-1 flex-row items-center p-2 cursor-pointer rounded-[30px] px-3 ${productStatusColors[product.status]}`}>
                                                <p className='capitalize'>{product.status}</p>
                                                <img src="/icons/chevron-down.svg" className='w-[20px] aspect-auto' alt="" />
                                                {/* <div className="dropdown">
                                                <div tabIndex={0} role="button" className={`flex gap-1 flex-row items-center p-2 cursor-pointer rounded-[30px] px-3 ${productStatusColors[product.status]}`}>
                                                    <p className='capitalize'>{product.status}</p>
                                                    <img src="/icons/chevron-down.svg" className='w-[20px] aspect-auto' alt="" />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-3 shadow bg-white border rounded-box w-52">
                                                    <div className='flex flex-col gap-3 p-2'>
                                                        <div className='flex flex-row gap-2 items-center cursor-pointer'>
                                                            {product.status === 'active' && <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-success" />}
                                                            <p>Active</p>
                                                        </div>
                                                        <div className='flex flex-row gap-2 items-center cursor-pointer'>
                                                            {product.status === 'archived' && <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-success" />}
                                                            <p>Archived</p>
                                                        </div>
                                                        <div className='flex flex-row gap-2 items-center cursor-pointer'>
                                                            {product.status === 'draft' && <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-success" />}
                                                            <p>Draft</p>
                                                        </div>
                                                    </div>
                                                </ul>
                                            </div> */}
                                            </div>
                                        </td>
                                        <td>
                                            <p>{product.upload_date}</p>
                                        </td>
                                        <td>
                                            <p>{product.price}</p>
                                        </td>
                                        <td>
                                            <p>{product.category}</p>
                                        </td>
                                        <td>
                                            <div className='flex flex-row gap-4'>
                                                <div className='flex flex-row gap-2'>
                                                    <img src="/icons/edit.svg" alt="" />
                                                    <Link href={`?item=${product.id}&action=delete-service`}><img src="/icons/delete.svg" alt="" /></Link>
                                                </div>
                                                <div className='flex flex-row gap-2'>
                                                    <img src="/icons/whatshot_green.svg" alt="" />
                                                    <p className='text-primary font-semibold'>Promote</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default MyServicesTable