'use client'
import React from 'react'
import SummaryDescription from '../common/SummaryDescription'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import DateInput from '@/components/common/form/DateInput'
import ImageListSelector from '@/components/common/form/ImageListSelector'
import TextInput from '@/components/common/form/TextInput'
import CustomRadioWithConditionalInput from '@/components/common/form/RadioWithConditionalInput'
import budgetingOptions from '../../data/budgeting.json'
import destinationOptions from '../../data/destination.json'
import { createPromotion } from '@/actions/promotion/create-promotion'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import { useFormState } from 'react-dom'
import { BUDGETING_TYPE_CHOICES, DESTINATION_TYPE_CHOICES } from '../../data/discount-contants'
import { formatNumber as priceFormatter } from '@/utils/priceFormatter.util'

type Props = {
    products: any
    itemType: string
}
function BannerAdsForm({ itemType, products }: Props) {

    const [campaignName, setCampaignName] = React.useState<string>()
    const [destinationType, setDestinationType] = React.useState<string>()
    const [shop, setShop] = React.useState<string>()
    const [items, setItems] = React.useState<string>()
    const [budgeting, setBudgeting] = React.useState<string>()
    const [budget, setBudget] = React.useState<string>()
    const [banners, setBanners] = React.useState<(File | string)[]>([])
    const [startDate, setStartDate] = React.useState<string>('')
    const [endDate, setEndDate] = React.useState<string>('')

    const [formState, action] = useFormState(
        createPromotion,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    return (
        <div className='grid grid-cols-3 gap-6'>
            <form action={action} className='col-span-2 flex flex-col gap-5 bg-white'>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <input type="text" hidden value='BANNER' name='promotion_type' id='promotion_type' onChange={() => { }} />
                    <input type="text" hidden value={itemType} name='item_type' id='item_type' onChange={() => { }} />
                    <h3 className='font-semibold text-xl'>General Info</h3>
                    <div className='max-w-[1300px] gap-5 flex flex-col'>
                        <TextInput
                            id='campaign_name'
                            name='campaign_name'
                            value={campaignName}
                            setValue={setCampaignName}
                            placeholder='Enter campaign name'
                            label='Campaign name'
                            error={formState?.fieldErrors?.name?.[0]} />
                        {/* <TextAreaInput id='description' placeholder='Enter description/promotional quotes' label='Description/Promotional quotes'   /> */}
                        <div className="grid grid-cols-2">
                            <DateInput
                                setValue={setStartDate}
                                label='Start date & time'
                                id='start_datetime'
                                name='start_datetime'
                                error={formState?.fieldErrors?.start_date?.[0]} />
                            <DateInput
                                setValue={setEndDate}
                                label='End date & time'
                                id='end_datetime'
                                name='end_datetime'
                                error={formState?.fieldErrors?.end_date?.[0]} />
                        </div>
                        <div className="col-span-2">
                            <ImageListSelector
                                setValue={setBanners}
                                label='Banner Ads'
                                id='ad_files'
                                name='ad_files'
                                error={formState?.fieldErrors?.ad_files?.[0]} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Destination</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        <CustomRadioWithConditionalInput
                            data={destinationOptions}
                            inputForEach={true}
                            key={'destination-type'}
                            id={'destination_type'}
                            name={'destination_type'}
                            setValue={setDestinationType}
                            value={destinationType}
                            error={formState?.fieldErrors?.promotional_discount_type?.[0]}
                            childError={{
                                products: formState?.fieldErrors?.products?.[0],
                                shop: formState?.fieldErrors?.shop?.[0],
                            }}
                            childSetValue={{
                                products: setItems,
                                shop: setShop,
                            }}
                            childValue={{
                                products: items,
                                shop: shop,
                            }}
                            childOptions={{
                                products: products
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Budgeting</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        <CustomRadioWithConditionalInput
                            data={budgetingOptions}
                            inputForEach={false}
                            key={'budgeting'}
                            id={'budgeting'}
                            name={'budgeting'}
                            setValue={setBudgeting}
                            value={budgeting}
                            error={formState?.fieldErrors?.budgeting?.[0]}
                            childError={{ budget: formState?.fieldErrors?.budget?.[0] }}
                            childSetValue={{ budget: setBudget }}
                            childValue={{ budget: budget }}
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <PrimaryButton padding={'md'} name='Pay & Schedule' type='submit' />
                </div>

            </form >
            <div className='col-span-1 bg-white flex flex-col gap-8'>
                <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                    <h3 className='font-semibold text-xl'>Summary</h3>
                    <SummaryDescription
                        title='Campaign name'
                        description={campaignName} />
                    <SummaryDescription
                        title='Start date & time'
                        description={startDate} />
                    <SummaryDescription
                        title='End date & time'
                        description={endDate} />
                    <SummaryDescription
                        title='Banner'
                        description={banners.find(b => b instanceof File) ? 'unuploaded' : banners.length > 0 ? 'uploaded.' : 'no file selected'} />
                    <SummaryDescription
                        title='Destination'
                        description={DESTINATION_TYPE_CHOICES.find(ele => ele.value == destinationType)?.label} />
                    {
                        destinationType == 'LIST_OF_PRODUCTS' &&
                        <SummaryDescription
                            title={itemType}
                            description={items} />
                    }
                    <SummaryDescription
                        title='Budgeting'
                        description={BUDGETING_TYPE_CHOICES.find(ele => ele.value == budgeting)?.label} />
                    <SummaryDescription
                        title='Budget'
                        description={priceFormatter(+(budget || 0))} />
                </div>
            </div>
        </div>
    )
}

export default BannerAdsForm