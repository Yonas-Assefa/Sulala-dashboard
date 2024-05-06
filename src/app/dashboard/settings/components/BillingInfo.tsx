import PhoneNumberInput from '@/components/common/form/PhoneNumberInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import TextInput from '@/components/common/form/TextInput'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function BillingInfo() {
    const path = usePathname()
    return (
        <div className='mt-4 w-full flex flex-col gap-8 items-start'>
            <div className='flex flex-col gap-4'>
                <h4 className='font-[500]'>Payment methods</h4>
                <div className='border rounded-[40px] flex flex-row justify-between p-3 w-[500px]'>
                    <div className='flex flex-row gap-2'>
                        <img src="/icons/mastercard.svg" alt="" />
                        <span>••••</span>
                        <span>1234</span>
                        <div className="badge badge-warning gap-2 bg-[#fbe46f] p-3">
                            Primary
                        </div>
                    </div>
                    <div className='self-end justify-self-end mr-1 -mb-1'>
                        <div className="dropdown dropdown-end">
                            <button className=''>
                                <img src="/icons/more-horizontal.svg" alt="" />
                            </button>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-0 shadow border rounded-box w-52 bg-white text-black">
                                <li className='border-b'><a>Set as primary</a></li>
                                <li className=''><a>Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border rounded-[40px] flex flex-row justify-between p-3 w-[500px]'>
                    <div className='flex flex-row gap-2'>
                        <img src="/icons/mastercard.svg" alt="" />
                        <span>••••</span>
                        <span>1234</span>
                    </div>
                    <div className='self-end justify-self-end mr-1 -mb-1'>
                        <div className="dropdown dropdown-end">
                            <button className=''>
                                <img src="/icons/more-horizontal.svg" alt="" />
                            </button>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-0 shadow border rounded-box w-52 bg-white text-black">
                                <li className='border-b'><a>Set as primary</a></li>
                                <li className=''><a>Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Link href={`?action=create-payment-method`} className='flex flex-row gap-2 bg-tertiary self-start py-2 px-4 rounded-[30px]'>
                    <img src="/icons/plus.svg" alt="" />
                    <span>Add new</span>
                </Link>
            </div>
        </div>
    )
}

export default BillingInfo