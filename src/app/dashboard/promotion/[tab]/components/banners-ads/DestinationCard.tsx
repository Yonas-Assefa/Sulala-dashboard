import CustomMultiSelectInput from '@/components/common/form/SelectInput'
import React from 'react'

function DestinationCard() {
    return (
        <div className='flex flex-col gap-5 bg-tertiary rounded-[30px] p-8'>
            <h3 className='font-semibold text-xl'>Destination</h3>
            <div className='max-w-[1300px] gap-6 flex flex-col'>
                {
                    [
                        {
                            name: 'Lists of products',
                            id: 'lists_of_products',
                            input_label: 'Products list',
                            input_placeholder: 'Select products',
                        }, {
                            name: 'Shop',
                            id: 'shop',
                            input_label: 'Shops list',
                            input_placeholder: 'Select shops',
                        }
                    ]
                        .map((item) => {
                            return (
                                <div className='flex flex-col gap-5 ' key={item.id}>
                                    <label htmlFor={item.id} className='peer flex flex-row gap-2 items-center cursor-pointer'>
                                        <input type="radio" name="dicount_type" id={item.id} className="radio radio-success border-secondary" />
                                        <span className='capitalize'>{item.name}</span>
                                    </label>
                                    <div className='w-1/2 check hidden peer-has-[:checked]:block '>
                                        <CustomMultiSelectInput id={item.id} label={item.input_label} placeholder={item.input_placeholder} multi={true} nested={false} withImage={true} onChange={() => { }} onClear={() => { }} value='' />
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default DestinationCard