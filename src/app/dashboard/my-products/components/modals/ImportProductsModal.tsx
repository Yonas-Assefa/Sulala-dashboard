'use client'
import FileInput from '@/components/common/form/FileInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import React from 'react'

function ImportProductsModal() {
    const [file, setFile] = React.useState<FileList | null>(null)

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files)
    }

    return (
        <dialog id="import_products_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Import</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <FileInput label='Please attach the csv file' handleFile={handleFile} file={file} accept={['.csv']} />
                    <PrimaryButton name='Import' disabled={file?.length == undefined} />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'>closedfsf</button>
            </form>
        </dialog>
    )
}

export default ImportProductsModal