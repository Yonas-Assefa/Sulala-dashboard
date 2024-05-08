'use client'
import FileInput from '@/components/common/form/FileInput'
import PasswordInput from '@/components/common/form/PasswordInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

// type Props = {
//     open: boolean
// }
function ImportProductsModal() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const open = searchParams.get('action') == 'import'
    const [file, setFile] = React.useState<FileList | null>(null)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files)
    }

    const clearFile = () => {
        setFile(null)
    }

    return (
        <dialog id="my_modal_4" className={`modal ${open && 'modal-open'}`} onClick={() => router.back()}>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0" onClick={(e) => e.stopPropagation()}>
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Import</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <FileInput label='Please attach the csv file' onChange={handleFile} onClear={clearFile} value={file} accept={['.pdf']} />
                    <PrimaryButton name='Import' disabled={file?.length == undefined} />
                </div>
            </div>
        </dialog>
    )
}

export default ImportProductsModal