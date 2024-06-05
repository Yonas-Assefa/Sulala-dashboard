'use client'
import { importProduct } from '@/actions/products/import-product'
import FileInput from '@/components/common/form/FileInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { closeModal } from '@/lib/modals'
import { EMPTY_FORM_STATE, toFormState } from '@/utils/formStateHelper'
import { pushWarningNotification } from '@/utils/pushNotification.util'
import React from 'react'
import { usePapaParse } from 'react-papaparse';

function ImportProductsModal() {
    const [file, setFile] = React.useState<File | null | undefined>(null)
    const [formState, setFormState] = React.useState<any>(EMPTY_FORM_STATE)
    const [showPreview, setShowPreview] = React.useState(false);
    const [previewData, setPreviewData] = React.useState<any[]>([]);
    const [isPending, startTransition] = React.useTransition();
    const [isDisabled, setIsDisabled] = React.useState(true);
    const previewRef = React.useRef<HTMLDivElement>(null);

    useToastMessage(formState);
    useRedirectRoute(formState)

    const { readString } = usePapaParse();

    const handleFile = (file: File | undefined | null) => {
        setFile(file)
    }

    const expectedHeaders = ['category', 'title', 'price', 'discounted_price', 'description', 'inventory', 'status']

    const handleFileChange = async () => {
        if (file && file.size > 0) {
            const fileContent = await file.text();
            readString(fileContent, {
                complete: (results) => {
                    if (!results.data || results.data.length < 1 || !Array.isArray(results.data[0])) {
                        setFormState(toFormState('ERROR', 'Invalid csv file.'))
                        return
                    }
                    setPreviewData(results.data);
                    const fileHeaders = results.data[0]
                    const missingColumns = expectedHeaders.filter((header) => !fileHeaders?.includes(header))
                    const extraColumns = fileHeaders.filter((header) => !expectedHeaders.includes(header))
                    if (missingColumns.length > 0) {
                        setFormState(toFormState('ERROR', `Missing columns: ${missingColumns.join(', ')}`))
                        setIsDisabled(true)
                    } else if (extraColumns.length > 0) {
                        setFormState(toFormState('ERROR', `Extra columns: ${extraColumns.join(', ')}`))
                        setIsDisabled(true)
                    } else {
                        setFormState(toFormState('SUCCESS', 'Csv file is valied. Click import to proceed.'))
                        setIsDisabled(false)
                    }
                },
            });
        }
    }

    const handleFileUpload = async () => {
        if (file && file.size > 0) {
            startTransition(async () => {
                try {
                    const formData = new FormData();
                    formData.append('csv_file', file);
                    const response = await importProduct(formData)
                    setFormState(response)
                    if (response.status === 'SUCCESS') {
                        setFile(null)
                        setShowPreview(false)
                        setPreviewData([])
                        setIsDisabled(true)
                        closeModal('import_products_modal')
                    } else {
                        pushWarningNotification(`Make sure the file formate is in csv with the correct headers only: ${expectedHeaders.join(', ')}`)
                    }
                } catch (error) {
                    setFormState(toFormState('ERROR', 'Failed to import products'))
                }
            })
        } else {
            setFormState(toFormState('ERROR', 'Invalid file'))
        }
    }

    React.useEffect(() => {
        handleFileChange()
        if (!file) {
            setPreviewData([])
            setShowPreview(false)
            setIsDisabled(true)
        }
    }, [file])

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        if (previewRef.current) {
            const scrollBy = 30
            if (event.deltaY > 0) {
                previewRef.current.scrollLeft += scrollBy;
            } else {
                previewRef.current.scrollLeft -= scrollBy;
            }
        }
    };

    return (
        <dialog id="import_products_modal" className='modal'>
            <div className="modal-box w-11/12 max-w-sm bg-white px-0">
                <div className='border-b-2 border-gray-200 pb-3'>
                    <h3 className="font-bold text-xl text-black text-center font-serif">Import</h3>
                </div>
                {file && file?.size > 0 && <button className='underline text-primary text-xs px-4' onClick={() => setShowPreview(!showPreview)}>{showPreview ? 'hide' : 'show'} preview</button>}
                {
                    showPreview && (
                        <div ref={previewRef} onWheel={handleScroll} className="overflow-x-scroll mx-4 select-none text-black bg-tertiary border border-black" >
                            <table className="table table-xs">
                                <thead>
                                    <tr className='text-black font-semibold'>
                                        {previewData[0].map((header: string) => {
                                            const isValid = expectedHeaders.includes(header.toLowerCase())
                                            return <th key={header} className={`${isValid ? 'text-primary' : 'text-danger'}`}>{header}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewData.slice(1, 3).map((row, i) => (
                                        <tr key={i} className='border text-black font-extralight italic'>
                                            {row.map((cell: string, j: number) => (
                                                <td key={j}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )
                }
                <div className="px-5 flex flex-col gap-3 mt-4">
                    <FileInput id='csv' name='csv' label='Please attach the csv file' setValue={handleFile} accept={['.csv']} sizeLimit={{ value: 5, unit: 'MB' }} error={formState.status == 'ERROR' && formState.message} />
                    <PrimaryButton name='Import' disabled={!file || isDisabled} handleClick={handleFileUpload} isPending={isPending} />
                </div>
                {file && <div className='w-full flex justify-center flex-row pt-2 gap-2 items-center opacity-60'>
                    <img src="/icons/alert.svg" alt="" className='w-[15px]' />
                    <p className='text-danger text-xs'>Images will not be included!</p>
                </div>}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button className='text-black'></button>
            </form>
        </dialog>
    )
}

export default ImportProductsModal