import React from 'react'
import ImageUnselectButton from '../ui/ImageUnselectButton'

type Props = {
    multi?: boolean
}

function ImageListSelector({ multi = false }: Props) {
    const [images, setImages] = React.useState<string[]>([])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files as Iterable<File> | ArrayLike<File>);
        const uploadedImages = selectedFiles.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...uploadedImages]);
    };

    return (
        <div className='flex flex-col gap-1'>
            <p>Images</p>
            {images.length == 0 ? <label htmlFor="image" className='flex flex-col items-center justify-center gap-5 cursor-pointer w-full bg-white p-4 border rounded-[30px] border-dashed h-[300px]'>
                <img src="/icons/image.svg" alt="" />
                <div className='flex flex-col justify-center items-center text-secondary'>
                    <p>Upload upto 8 images. JPEG, PNG</p>
                    <p>Maximum size 20 MB</p>
                </div>
                <div className='flex gap-2'>
                    <img src="/icons/upload.svg" alt="" className='w-[15px]' />
                    <p className='text-primary font-semibold'>Upload</p>
                </div>
            </label> :
                <div className='flex flex-wrap gap-3'>
                    {
                        images.map((image, index) => (
                            <div key={index} className='bg-[#d9d9d9] block h-[180px] aspect-square rounded-[20px] relative'>
                                <ImageUnselectButton onClick={() => {
                                    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
                                }} />
                                <img src={image} alt="" className='w-full h-full rounded-[20px]' />
                            </div>
                        ))
                    }
                    <label htmlFor='image' className='bg-[#ffffff] cursor-pointer block h-[180px] aspect-square rounded-[20px]'>
                        <div className='w-full h-full flex justify-center items-center'>
                            <img src="/icons/image.svg" alt="" className='w-[30px] aspect-square' />
                        </div>
                    </label>
                </div>}
            <input type="file" name="" id="image" className='hidden' onChange={handleImageUpload} multiple accept='image/*' />
        </div>
    )
}

export default ImageListSelector