import PhoneNumberInput from '@/components/common/form/PhoneNumberInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import SecondaryButton from '@/components/common/ui/SecondaryButton'
import SelectInput from '@/components/common/form/SelectInput'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'

function ShopInfo() {
    return (
        <div className='mt-4 w-full flex flex-col gap-8'>
            <div className='flex flex-row gap-4 items-center'>
                <label htmlFor='add-photo' className="bg-tertiary cursor-pointer w-[6vw] min-w-[50px] flex justify-center items-center aspect-square rounded-full">
                    <img src="/icons/camera.svg" alt="" />
                </label>
                <div className='flex flex-col gap-2'>
                    <p className='text-primary font-semibold'>Add photo</p>
                    <div className='text-secondary flex flex-col gap-0'>
                        <span>JPEG, PNG</span>
                        <span>Max 20 MB</span>
                    </div>
                </div>
                <input type="file" name="add-photo" id="add-photo" className='hidden' />
            </div>
            <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                <TextInput id='shop-name' placeholder='Shop name' label='Shop name' onChange={() => { }} onClear={() => { }} value='' />
                <TextInput id='categories' placeholder='Categories' label='Categories' onChange={() => { }} onClear={() => { }} value='' />
                <TextInput id='legal-address' placeholder='Legal Address' label='Legal Address' onChange={() => { }} onClear={() => { }} value='' />
                <TextInput id='website' placeholder='Website' label='Website' onChange={() => { }} onClear={() => { }} value='' />
                <div className="col-span-2">
                    <TextAreaInput id='description' placeholder='Text' label='Shop description' onChange={() => { }} onClear={() => { }} value='' />
                </div>
            </div>

            <div className='max-w-[400px] flex flex-col items-start gap-5'>
                <h5 className='font-[500] text-lg'>Social links</h5>
                <div className='flex flex-col gap-4'>
                    <div>
                        <label htmlFor="instagram">Instagram link</label>
                        <div className='flex flex-row gap-2 border-2 rounded-[30px] px-4'>
                            <img src="/icons/instagram.svg" alt="" />
                            <input type="text" placeholder='Insert link' className='input bg-white outline-none active:outline-none active:border-0 focus:outline-none focus:border-0' />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="facebook">Facebook link</label>
                        <div className='flex flex-row gap-2 border-2 rounded-[30px] px-4'>
                            <img src="/icons/facebook.svg" alt="" />
                            <input type="text" placeholder='Insert link' className='input bg-white outline-none active:outline-none active:border-0 focus:outline-none focus:border-0' />
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <PrimaryButton padding={'md'} name='Save' onClick={() => { }} />
                </div>
            </div>

        </div>
    )
}

export default ShopInfo