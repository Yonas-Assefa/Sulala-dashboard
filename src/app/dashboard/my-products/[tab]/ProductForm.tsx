'use client'
import { createProduct } from '@/actions/products/create-product'
import ImageListSelector from '@/components/common/form/ImageListSelector'
import RadioInput from '@/components/common/form/RadioInput'
import SelectInput from '@/components/common/form/SelectInput'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import React from 'react'
import { useFormState } from 'react-dom'

type Props = {
    categoryLists: any
}
function ProductForm({ categoryLists }: Props) {


    const [formState, action] = useFormState(
        createProduct,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    const data = categoryLists?.map((category: any) => {
        return {
            label: category.name,
            value: category.id
        }
    })

    const productStatusOptions = [
        { label: 'New', value: 'NEW' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Archived', value: 'ARCHIVED' },
    ]

    return (
        <form action={action} className='flex flex-col gap-4'>
            <div className='grid grid-cols-3 gap-6'>
                <div className='col-span-2 flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>General Info</h3>
                    <div className='grid grid-cols-2 max-w-[1300px] gap-5'>
                        <TextInput id='product_name' name='product_name' error={formState.fieldErrors?.title?.[0]} placeholder='Enter product name' label='Title' />
                        <TextInput id='quality' name='quality' type='number' placeholder='Enter Quality' label='Quality' error={formState.fieldErrors?.inventory?.[0]} />
                        <div className="col-span-2">
                            <TextAreaInput id='description' name='description' placeholder='Text' label='Description' error={formState.fieldErrors?.description?.[0]} />
                        </div>
                        <TextInput id='price' name='price' type='number' placeholder='Enter price' label='Price' error={formState.fieldErrors?.price?.[0]} />
                        <TextInput id='discount' name='discount' type='number' defaultValue='0' placeholder='Enter discount in %' label='Discount' error={formState.fieldErrors?.discounted_price?.[0]} />
                        <div className="col-span-2">
                            <ImageListSelector id='product_images' name='product_images' multi error={formState.fieldErrors?.images?.[0]} />
                        </div>
                    </div>
                </div>
                <div className='col-span-1 bg-white flex flex-col gap-8'>
                    <RadioInput label='Status' id='status' name='status' options={productStatusOptions} error={formState.fieldErrors?.status?.[0]} />
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product organization</h3>
                        <SelectInput id='category' name='category' label='Category' data={data} error={formState.fieldErrors?.category?.[0]} />
                    </div>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product promotion</h3>
                        <SelectInput id='campaign' label='Promo campaign (optional)' multi={false} nested={true} />
                        <TextAreaInput id='description' placeholder='Enter tags for the product' label='Tags' />
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <PrimaryButton padding={'md'} name='Save' type='submit' />
            </div>
        </form>
    )
}

export default ProductForm