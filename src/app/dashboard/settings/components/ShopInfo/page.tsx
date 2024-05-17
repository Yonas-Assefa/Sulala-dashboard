'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import React from 'react'
import ProfileImagePicker from '@/components/common/form/ProfileImagePicker'
import { updatePersonalInfo } from '@/actions/settings/update-personal-info'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import { useFormState } from 'react-dom'

function ShopInfo() {

    const [formState, action] = useFormState(
        updatePersonalInfo,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <div className='mt-4 w-full flex flex-col gap-8'>
            <ProfileImagePicker />
            <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                <TextInput id='shop-name' placeholder='Shop name' label='Shop name' />
                <TextInput id='categories' placeholder='Categories' label='Categories' />
                <TextInput id='legal-address' placeholder='Legal Address' label='Legal Address' />
                <TextInput id='website' placeholder='Website' label='Website' />
                <div className="col-span-2">
                    <TextAreaInput id='description' placeholder='Text' label='Shop description' />
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
                    <PrimaryButton padding={'md'} name='Save' />
                </div>
            </div>

        </div>
    )
}

export default ShopInfo