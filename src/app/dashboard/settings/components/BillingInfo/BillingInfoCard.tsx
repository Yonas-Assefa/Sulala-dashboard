import React from 'react'

type Props = {
    isPrimary: boolean
}
function BillingInfoCard({ isPrimary }: Props) {
    return (
        <div className='border rounded-[40px] flex flex-row justify-between p-3 w-[500px]'>
            <div className='flex flex-row gap-2'>
                <img src="/icons/mastercard.svg" alt="" />
                <span>••••</span>
                <span>1234</span>
                {isPrimary && <div className="badge badge-warning gap-2 bg-[#fbe46f] p-3">
                    Primary
                </div>}
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
    )
}

export default BillingInfoCard