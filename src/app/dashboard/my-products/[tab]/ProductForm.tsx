'use client'
import { createUpdateProduct } from '@/actions/products/create-update-product'
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
    productTags: any
    initialValue: any
    tab: string
    animals: any
    brands: any
}
function ProductForm({ categoryLists, productTags, initialValue, tab, animals, brands }: Props) {

    const [formState, action] = useFormState(
        createUpdateProduct,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    const data = categoryLists

    const productStatusOptions = [
        { label: 'New', value: 'NEW' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Archived', value: 'ARCHIVED' },
    ]

    return (
        <form action={action} className='flex flex-col gap-4'>
            <input type="text" name="tab" id="tab" value={tab} onChange={() => { }} hidden />
            <input type="text" name="item" id="item" value={initialValue?.id} onChange={() => { }} hidden />
            <div className='flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6'>
                <div className='col-span-2'>
                    <div className="flex flex-col gap-5 p-8 bg-tertiary rounded-[30px]">
                        <h3 className='font-semibold text-xl'>General Info</h3>
                        <div className='flex flex-col md:grid md:grid-cols-2 max-w-[1300px] gap-5'>
                            <TextInput id='product_name' name='product_name' error={formState.fieldErrors?.title?.[0]} placeholder='Enter product name' label='Title' defaultValue={initialValue?.title} />
                            <TextInput id='quantity' name='quantity' type='number' placeholder='Enter Quantity' label='Quantity' error={formState.fieldErrors?.inventory?.[0]} defaultValue={initialValue?.inventory} />
                            <div className="col-span-2">
                                <TextAreaInput id='description' name='description' placeholder='Text' label='Description' error={formState.fieldErrors?.description?.[0]} defaultValue={initialValue?.description} />
                            </div>
                            <TextInput id='price' name='price' type='number' placeholder='Enter price' label='Price' error={formState.fieldErrors?.price?.[0]} defaultValue={initialValue?.price} />
                            <TextInput id='discount' name='discount' type='number' defaultValue={initialValue?.discounted_price || 0} placeholder='Enter discount in %' label='Discount' error={formState.fieldErrors?.discounted_price?.[0]} />
                            <div className="col-span-2">
                                <ImageListSelector id='product_images' name='product_images' multi error={formState.fieldErrors?.images?.[0]} defaultValues={initialValue?.images} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 bg-white flex flex-col gap-8'>
                    <RadioInput label='Status' id='status' name='status' options={productStatusOptions} error={formState.fieldErrors?.status?.[0]} defaultValue={initialValue?.status} />
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product organization</h3>
                        <SelectInput id='category' name='category' label='Category' data={data} error={formState.fieldErrors?.categories?.[0]} defaultValue={initialValue?.categories_value} />
                    </div>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Animal and Branding</h3>
                        <SelectInput searchable id='animal' name='animal' label='Animals' data={animals} multi={true} />
                        <SelectInput searchable id='brand' name='brand' label='Brand' data={brands} error={formState.fieldErrors?.tags?.[0]} defaultValue={initialValue?.tags} multi />
                    </div>
                    <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                        <h3 className='font-semibold text-xl'>Product promotion</h3>
                        <SelectInput id='campaign' label='Promo campaign (optional)' multi={false} nested={true} />
                        {/* <TextAreaInput id='description' placeholder='Enter tags for the product' label='Tags' /> */}
                        <SelectInput searchable id='product_tag' name='product_tag' label='Tags' data={productTags} error={formState.fieldErrors?.tags?.[0]} defaultValue={initialValue?.tags} multi />
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