'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    open: boolean
}
function LogoutModal() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const open = searchParams.get('action') == 'logout'
    return (
        <dialog id="my_modal_4" className={`modal ${open && 'modal-open'}`} onClick={() => router.back()}>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0" onClick={(e) => e.stopPropagation()}>
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Log out?</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <button className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 ">Yes</button>
                    <button
                        className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black "
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default LogoutModal