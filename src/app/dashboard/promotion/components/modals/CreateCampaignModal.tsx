'use client'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

// type Props = {
//     open: boolean
// }
function CreateCampaignModal() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const open = searchParams.get('action') == 'add-campaign'

    return (
        <dialog id="my_modal_4" className={`modal ${open && 'modal-open'}`} onClick={() => router.back()}>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0" onClick={(e) => e.stopPropagation()}>
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Create campaign</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <div className='flex flex-col gap-4 my-2'>
                        <label htmlFor='radio-1' className='flex flex-row gap-2 items-center cursor-pointer'>
                            <input type="radio" name="radio-5" id='radio-1' className="radio radio-success border-secondary" />
                            <p className='text-black font-semibold'>Promote services</p>
                        </label>
                        <label htmlFor='radio-2' className='flex flex-row gap-2 items-center cursor-pointer'>
                            <input type="radio" name="radio-5" id='radio-2' className="radio radio-success border-secondary" />
                            <p className='text-black font-semibold'>Promote products</p>
                        </label>
                    </div>
                    <Link
                        className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80`}
                        href={`${pathname}/add`}
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </dialog>
    )
}

export default CreateCampaignModal