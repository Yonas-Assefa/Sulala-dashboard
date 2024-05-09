import React from 'react'

function LogoutModal() {

    return (
        <dialog id="logout_setting_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Log out?</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 my-4">
                    <button className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 ">Yes</button>
                    <form method="dialog">
                        <button className="btn modal-backdrop w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-black">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog>
    )
}

export default LogoutModal