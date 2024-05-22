'use client'
import PrimaryButton from '@/components/common/ui/PrimaryButton'
import React from 'react'
import SummaryDescription from '../common/SummaryDescription'
import DateInput from '@/components/common/form/DateInput'
import ImageListSelector from '@/components/common/form/ImageListSelector'
import CustomRadioWithConditionalInput from '@/components/common/form/RadioWithConditionalInput'
import CustomMultiSelectInput from '@/components/common/form/SelectInput'
import TextAreaInput from '@/components/common/form/TextAreaInput'
import TextInput from '@/components/common/form/TextInput'
import { formatNumber as priceFormatter } from '@/utils/priceFormatter.util'
import { formatNumber as percentFormatter } from '@/utils/percentFormatter.util'
import promotionDiscountOptions from '../../data/promotional-discount-type.json'
import budgetingOptions from '../../data/budgeting.json'
import { BUDGETING_TYPE_CHOICES, DISCOUNT_TYPE_CHOICES } from '../../data/discount-contants'
import { createPromotion } from '@/actions/promotion/create-promotion'
import { useRedirectRoute } from '@/hooks/useRedirectRoute'
import { useToastMessage } from '@/hooks/useToastMessage'
import { EMPTY_FORM_STATE } from '@/utils/formStateHelper'
import { useFormState } from 'react-dom'
import { formatPiece } from '@/utils/pieceFormatter.util'
import { convertToArray } from '@/utils/convertObjToArray'

type Props = {
    products: any
    itemType: string
    promotion: any
}
function ProductDiscountAdsForm({ products, itemType, promotion }: Props) {

    const [campaignName, setCampaignName] = React.useState<string>('')
    const [item, setItem] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')
    const [startDate, setStartDate] = React.useState<string>('')
    const [endDate, setEndDate] = React.useState<string>('')
    const [promoDiscountType, setPromoDiscountType] = React.useState<string>('')
    const [discount, setDiscount] = React.useState<any>()
    const [limitedPrice, setLimitedPrice] = React.useState<any>()
    const [cartTotal, setCartTotal] = React.useState<any>()
    const [budgeting, setBudgeting] = React.useState<string>()
    const [budget, setBudget] = React.useState<string>()
    const [banners, setBanners] = React.useState<(File | string)[]>([])

    const [formState, action] = useFormState(
        createPromotion,
        EMPTY_FORM_STATE
    );

    useToastMessage(formState);
    useRedirectRoute(formState);

    console.log({ promotion })

    return (
        <div className='grid grid-cols-3 gap-6'>
            <form action={action} className='col-span-2 flex flex-col gap-5 bg-white'>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <input type="text" hidden value='DISCOUNT' name='promotion_type' id='promotion_type' onChange={() => { }} />
                    <input type="text" hidden value={itemType} name='item_type' id='item_type' onChange={() => { }} />
                    <h3 className='font-semibold text-xl'>General Info</h3>
                    <div className='max-w-[1300px] gap-5 flex flex-col'>
                        <TextInput
                            id='campaign_name'
                            name='campaign_name'
                            value={campaignName}
                            defaultValue={promotion?.campaign_name}
                            setValue={setCampaignName}
                            placeholder='Enter campaign name'
                            label='Campaign name'
                            error={formState?.fieldErrors?.name?.[0]} />
                        <CustomMultiSelectInput
                            data={products}
                            value={item}
                            setValue={setItem}
                            id={itemType}
                            name={itemType}
                            label={`${itemType}s list`}
                            defaultValue={promotion?.[`${itemType}s`]}
                            // defaultValue={[9, 10]}
                            placeholder={`Select ${itemType}s`}
                            multi
                            withImage={true}
                            error={formState?.fieldErrors?.[`${itemType}s`]?.[0]} />
                        <TextAreaInput
                            value={description}
                            setValue={setDescription}
                            defaultValue={promotion?.description}
                            id='description'
                            name='description'
                            placeholder='Enter description/promotional quotes' label='Description/Promotional quotes'
                            error={formState?.fieldErrors?.description?.[0]}
                        />
                        <div className="grid grid-cols-2">
                            <DateInput
                                setValue={setStartDate}
                                defaultValue={promotion?.start_date}
                                label='Start date & time'
                                id='start_datetime'
                                name='start_datetime'
                                error={formState?.fieldErrors?.start_date?.[0]} />
                            <DateInput
                                setValue={setEndDate}
                                defaultValue={promotion?.end_date}
                                label='End date & time'
                                id='end_datetime'
                                name='end_datetime'
                                error={formState?.fieldErrors?.end_date?.[0]} />
                        </div>
                        <div className="col-span-2">
                            <ImageListSelector
                                setValue={setBanners}
                                defaultValues={convertToArray(promotion?.ad_files)}
                                label='Banner Ads'
                                id='ad_files'
                                name='ad_files'
                                error={formState?.fieldErrors?.ad_files?.[0]} />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
                    <h3 className='font-semibold text-xl'>Promotional discount type</h3>
                    <div className='max-w-[1300px] gap-6 flex flex-col'>
                        <CustomRadioWithConditionalInput
                            data={promotionDiscountOptions}
                            inputForEach={true}
                            key={'promo-discount-type'}
                            id={'promo_discount_type'}
                            name={'promo_discount_type'}
                            setValue={setPromoDiscountType}
                            value={promoDiscountType}
                            defaultValue={promotion?.promotional_discount_type}
                            error={formState?.fieldErrors?.promotional_discount_type?.[0]}
                            childError={{
                                discount: formState?.fieldErrors?.discount?.[0],
                                limited_price: formState?.fieldErrors?.limited_price?.[0],
                                cart_total: formState?.fieldErrors?.cart_total?.[0]
                            }}
                            childSetValue={{
                                discount: setDiscount,
                                limited_price: setLimitedPrice,
                                cart_total: setCartTotal
                            }}
                            childValue={{
                                discount: discount,
                                limited_price:
                                    limitedPrice,
                                cart_total: cartTotal
                            }}
                            childDefaultValue={{
                                discount: promotion?.discount,
                                limited_price: promotion?.limitedPrice,
                                cart_total: promotion?.cartTotal
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
                            defaultValue={promotion?.budgeting}
                            error={formState?.fieldErrors?.budgeting?.[0]}
                            childError={{ budget: formState?.fieldErrors?.budget?.[0] }}
                            childSetValue={{ budget: setBudget }}
                            childValue={{ budget: budget }}
                            childDefaultValue={{ budget: promotion?.budget }}
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <PrimaryButton
                        padding={'md'}
                        name='Pay & Schedule'
                        type='submit' />
                </div>

            </form>
            <div className='col-span-1 bg-white flex flex-col gap-8'>
                <div className="bg-tertiary rounded-[30px] p-8 flex flex-col gap-5">
                    <h3 className='font-semibold text-xl'>Summary</h3>
                    <SummaryDescription
                        title='Campaign name'
                        description={campaignName} />
                    <SummaryDescription
                        title={itemType}
                        description={item} />
                    <SummaryDescription
                        title='Description'
                        description={description} />
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
                        title='Promotional discount type'
                        description={DISCOUNT_TYPE_CHOICES.find(ele => ele.value == promoDiscountType)?.label} />
                    {
                        promoDiscountType === 'PERCENTAGE_OFF' &&
                        <SummaryDescription
                            title='Discount amount'
                            description={percentFormatter(+(discount) / 100 || 0)} />}
                    {
                        promoDiscountType === 'LIMITED_PRICE' &&
                        <SummaryDescription
                            title='Limited price'
                            description={priceFormatter(+(limitedPrice) || 0)} />}
                    {
                        promoDiscountType === 'PERCENTAGE_OFF_THE_MINIMUM_CART_SIZE' &&
                        <SummaryDescription
                            title='Total carts'
                            description={formatPiece((+cartTotal) || 0)} />}
                    {/* <SummaryDescription title='Destination' description='List of products' /> */}
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

export default ProductDiscountAdsForm