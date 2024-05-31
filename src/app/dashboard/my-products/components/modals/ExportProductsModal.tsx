'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import React from 'react'
import { pushSuccessNotification } from '@/utils/pushNotification.util';
import { mkConfig, generateCsv, download } from "export-to-csv";
import TextInput from '@/components/common/form/TextInput';
import { closeModal } from '@/lib/modals';

type Props = {
    exportData: any[]
}

function ExportProductsModal({ exportData }: Props) {
    const [csvFileName, setCsvFileName] = React.useState(`products_(${new Date().toLocaleDateString()}).csv`);


    const cleanedExportData = exportData.map((data) => ({ ...data, tags: data.tags.map((tag: any) => tag.label).filter((tag: any) => tag).join(', ') }))

    const downloadCsv = () => {
        const trimmedFileName = csvFileName.endsWith('.csv') ? csvFileName.slice(0, -4) : csvFileName;
        const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: trimmedFileName });
        const csv = generateCsv(csvConfig)(cleanedExportData);
        download(csvConfig)(csv)
        pushSuccessNotification(`Downloaded CSV file as ${csvFileName}.csv`)
        closeModal('export_products_modal')
    }

    return (
        <dialog id="export_products_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Export to CSV</h3>
                </div>
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <TextInput label='File Name' value={csvFileName} setValue={setCsvFileName} defaultValue={csvFileName} placeholder='example.csv' />
                    <PrimaryButton disabled={!(csvFileName?.length > 0)} name='Export' handleClick={downloadCsv} />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog>
    )
}

export default ExportProductsModal