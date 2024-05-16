'use client'
import React from 'react'
import ImageUnselectButton from '../ui/ImageUnselectButton'

type Props = {
    multi?: boolean
    label?: string
    error?: string
    id?: string
    name?: string
}

function ImageListSelector({ multi = false, label, error, name, id }: Props) {
    const [fileList, setFileList] = React.useState<File[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            fileList.forEach((file) => dataTransfer.items.add(file));
            console.log({ fileList })
            inputRef.current.files = dataTransfer.files;
        }
    }, [fileList]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files as Iterable<File> | ArrayLike<File>);
        setFileList(fileList.concat(selectedFiles));
    };

    return (
        <div className='flex flex-col gap-1'>
            <p>{label || 'Images'}</p>
            {fileList.length == 0 ?
                <label htmlFor={id} className={`flex flex-col items-center justify-center gap-5 cursor-pointer w-full p-4 border rounded-[30px] border-dashed h-[300px] select-none ${error ? 'border-danger bg-dangerlight' : 'bg-white'}`}>
                    <img src="/icons/image.svg" alt="" />
                    <div className='flex flex-col justify-center items-center text-secondary'>
                        <p>Upload upto 8 images. JPEG, PNG</p>
                        <p>Maximum size 20 MB</p>
                    </div>
                    <div className='flex gap-2'>
                        <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                        <p className='text-primary font-semibold'>Upload</p>
                    </div>
                </label> : multi ?
                    <div className='flex flex-wrap gap-3'>
                        {
                            fileList.map((file, index) => (
                                <div key={index} className='bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative'>
                                    <ImageUnselectButton handleClick={() => {
                                        setFileList((prevFile) => prevFile.filter((_, i) => i !== index))
                                    }} />
                                    <img src={URL.createObjectURL(file)} alt="" className='w-full h-full rounded-[20px]' />
                                </div>
                            ))
                        }
                        <label htmlFor={id} className='bg-[#ffffff] cursor-pointer block h-[180px] aspect-square rounded-[20px]'>
                            <div className='w-full h-full flex justify-center items-center'>
                                <img src="/icons/image.svg" alt="" className='w-[30px] aspect-square' />
                            </div>
                        </label>
                    </div> :
                    <div className='w-full'>
                        <div className='bg-[#d9d9d9] block rounded-[20px] relative'>
                            <ImageUnselectButton handleClick={() => setFileList([])} />
                            <img src={URL.createObjectURL(fileList[0])} alt="" className='w-full h-full rounded-[20px]' />
                        </div>
                    </div>}
            <input
                type="file"
                ref={inputRef}
                name={name}
                id={id}
                data-testid="uploader"
                onChange={handleImageUpload}
                multiple={multi}
                accept='image/*'
                hidden
            />

            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default ImageListSelector