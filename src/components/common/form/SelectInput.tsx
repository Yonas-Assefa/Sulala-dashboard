'use client'
import { SelectInputSchema } from '@/types/input-field.type'
import { CustomSelectInputProps } from '@/types/props.type'
import React, { useEffect } from 'react'
import { initialData, initialNestedData } from './constants/select-input.placeholder'

function CustomMultiSelectInput({ value, onChange, placeholder, label, name, autoComplete, error, onClear, multi = false, nested = false, withImage = false, data, ...props }: CustomSelectInputProps) {


    const [options, setOptions] = React.useState<SelectInputSchema[]>(data || (nested ? initialNestedData : initialData))

    const [selected, setSelected] = React.useState<SelectInputSchema[]>([])
    const [selectedParent, setSelectedParent] = React.useState<SelectInputSchema | null>(null)
    const [computedValue, setComputedValue] = React.useState<string | null>(null)
    const selectRef = React.useRef<HTMLDetailsElement>(null)

    const handleSelect = (value: string) => {
        if (nested) {
            if (!selectedParent) {
                const selectedParentValue = options.find(option => option.value === value) as SelectInputSchema
                if (selectedParentValue && selectedParentValue.options) {
                    setSelectedParent(selectedParentValue)
                    setOptions(selectedParentValue.options)
                }
            } else {
                if (selectedParent) {
                    const selectedChildValue = options.find(option => option.value === value) as SelectInputSchema
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

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                selectRef.current.removeAttribute('open')
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div>
            <label htmlFor="email-address" className='self-start'>{label}</label>
            <details ref={selectRef} className={`dropdown bg-white rounded-[30px] m-0 p-0 border w-full hover:bg-white outline-none `}>
                <summary className={`flex items-center overflow-hidden px-3 justify-between gap-0 focus-within:border-primary rounded-[40px] w-full cursor-pointer input bg-transparent select-none focus:outline-none ${computedValue ? 'text-black' : 'text-gray-400'}`}
                >

                    <p className='truncate'>{computedValue || (placeholder || 'Select one')}</p>
                    <img src="/icons/chevron-down.svg" alt="" className={`transition-all ${selectRef.current?.open && 'rotate-180'}`} />
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
                                        {
                                            withImage && <img src={option?.image} alt="" />
                                        }
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