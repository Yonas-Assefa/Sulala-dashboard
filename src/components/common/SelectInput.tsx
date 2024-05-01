'use client'
import { CustomSelectInputProps } from '@/types/props.type'
import React, { useEffect } from 'react'

function CustomMultiSelectInput({ value, onChange, placeholder, label, name, autoComplete, error, onClear, multi = false, nested = false, ...props }: CustomSelectInputProps) {

    type SelectedValues = {
        value: string
        label: string
    }

    type NestedSelectedValues = {
        label: string
        value: string
        options: SelectedValues[]
    }

    const initialData: SelectedValues[] = [
        {
            value: 'pet-foods-and-treats',
            label: 'Pet foods and treats'
        },
        {
            value: 'pet-accessories',
            label: 'Pet accessories'
        },
        {
            value: 'pet-toys',
            label: 'Pet toys'
        },
        {
            value: 'pet-care',
            label: 'Pet care'
        },
        {
            value: 'pet-health',
            label: 'Pet health'
        },
        {
            value: 'pet-grooming',
            label: 'Pet grooming'
        },
        {
            value: 'pet-training',
            label: 'Pet training'
        }
    ]

    const initialNestedData: NestedSelectedValues[] = [
        {
            label: 'Pet foods and treats',
            value: 'pet-foods-and-treats',
            options: [
                {
                    value: 'dog-food',
                    label: 'Dog food'
                },
                {
                    value: 'cat-food',
                    label: 'Cat food'
                },
                {
                    value: 'bird-food',
                    label: 'Bird food'
                },
                {
                    value: 'fish-food',
                    label: 'Fish food'
                },
                {
                    value: 'small-pet-food',
                    label: 'Small pet food'
                },
                {
                    value: 'reptile-food',
                    label: 'Reptile food'
                },
                {
                    value: 'horse-food',
                    label: 'Horse food'
                }
            ]
        },
        {
            label: 'Pet accessories',
            value: 'pet-accessories',
            options: [
                {
                    value: 'dog-accessories',
                    label: 'Dog accessories'
                },
                {
                    value: 'cat-accessories',
                    label: 'Cat accessories'
                },
                {
                    value: 'bird-accessories',
                    label: 'Bird accessories'
                },
                {
                    value: 'fish-accessories',
                    label: 'Fish accessories'
                },
                {
                    value: 'small-pet-accessories',
                    label: 'Small pet accessories'
                },
                {
                    value: 'reptile-accessories',
                    label: 'Reptile accessories'
                },
                {
                    value: 'horse-accessories',
                    label: 'Horse accessories'
                }
            ]
        },
        {
            label: 'Pet toys',
            value: 'pet-toys',
            options: [
                {
                    value: 'dog-toys',
                    label: 'Dog toys'
                },
                {
                    value: 'cat-toys',
                    label: 'Cat toys'
                },
                {
                    value: 'bird-toys',
                    label: 'Bird toys'
                },
                {
                    value: 'fish-toys',
                    label: 'Fish toys'
                },
                {
                    value: 'small-pet-toys',
                    label: 'Small pet toys'
                },
                {
                    value: 'reptile-toys',
                    label: 'Reptile toys'
                },
                {
                    value: 'horse-toys',
                    label: 'Horse toys'
                }
            ]
        },
    ]

    const [options, setOptions] = React.useState<SelectedValues[] | NestedSelectedValues[]>(nested ? initialNestedData : initialData)

    const [selected, setSelected] = React.useState<SelectedValues[]>([])
    const [selectedParent, setSelectedParent] = React.useState<NestedSelectedValues | null>(null)
    const [computedValue, setComputedValue] = React.useState<string | null>(null)
    const [open, setOpen] = React.useState(false)

    const handleSelect = (value: string) => {
        if (nested) {
            if (!selectedParent) {
                const selectedParentValue = options.find(option => option.value === value) as NestedSelectedValues
                if (selectedParentValue) {
                    setSelectedParent(selectedParentValue)
                    setOptions(selectedParentValue.options)
                }
            } else {
                if (selectedParent) {
                    const selectedChildValue = options.find(option => option.value === value) as SelectedValues
                    console.log({ selectedChildValue })
                    if (multi) {
                        if (selected.find(item => item.value === selectedChildValue?.value)) {
                            setSelected(selected.filter(item => item.value !== selectedChildValue?.value))
                        } else if (selectedChildValue) {
                            setSelected([...selected, selectedChildValue])
                        }
                    } else {
                        setSelected([selectedChildValue])
                        setSelectedParent(null)
                        setOptions(initialNestedData)
                    }
                }


            }
            return
        }

        const selectedValue = options.find(option => option.value === value)
        if (multi) {
            if (selected.find(item => item.value === selectedValue?.value)) {
                setSelected(selected.filter(item => item.value !== selectedValue?.value))
            } else if (selectedValue) {
                setSelected([...selected, selectedValue])
            }
        } else if (selectedValue) {
            setSelected([selectedValue])
        }
    }

    useEffect(() => {
        if (selected.length === 0) {
            setComputedValue('')
        } else {
            setComputedValue(selected.map(item => item.label).join(', '))
        }
    }, [selected])

    return (
        <div>
            <label htmlFor="email-address" className='self-start'>{label}</label>
            <details className={`dropdown bg-white rounded-[30px] m-0 p-0 border w-full hover:bg-white outline-none ${open && 'dropdown-open'}`}>
                <summary className={`flex items-center overflow-hidden px-3 justify-between gap-0 focus-within:border-primary rounded-[40px] w-full cursor-pointer input bg-transparent select-none focus:outline-none ${computedValue ? 'text-black' : 'text-gray-400'}`}
                    onClick={() => setOpen(!open)}
                >

                    <p className='truncate'>{computedValue || (placeholder || 'Select one')}</p>
                    <img src="/icons/chevron-down.svg" alt="" className={`transition-all ${open && 'rotate-180'}`} />
                </summary >
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 my-3 border-2 shadow rounded-box w-full bg-white">
                    {selectedParent &&
                        <li
                            onClick={() => {
                                setSelectedParent(null)
                                setOptions(initialNestedData)
                            }}
                        >
                            <div className={`form-control w-full flex flex-row justify-between rounded-none border-b`}>
                                <img src="/icons/arrow-left.svg" alt="" />
                                <label htmlFor='1' className="label-text font-semibold cursor-pointer label w-full flex justify-between text-black text-md">
                                    {selectedParent.label}
                                </label>
                            </div>
                        </li>}
                    {
                        options.map((option, i) => {
                            return (
                                <li
                                    onClick={() => handleSelect(option.value)}
                                >
                                    <div className={`form-control w-full flex flex-row justify-between rounded-none ${options.length !== i + 1 && 'border-b'}`}>
                                        <label htmlFor='1' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                            {option.label}
                                        </label>
                                        {selected.find((item => item.value === option.value)) && <img src="/icons/check.svg" alt="" />}
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </details>
        </div>
    )
}

export default CustomMultiSelectInput