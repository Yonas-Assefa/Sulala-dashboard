import React from 'react'
import { useFormStatus } from 'react-dom'

function ModalDeleteButton() {
    const { pending } = useFormStatus()
    return (
        <button
            className="btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-primary/20 border-0 text-red-600 "
            type='submit'
            disabled={pending}
        >
            {pending ? <span className="loading loading-spinner loading-md text-danger"></span> : 'Yes'}
        </button>
    )
}

export default ModalDeleteButton