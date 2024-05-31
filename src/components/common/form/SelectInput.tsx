'use client'
import { SelectInputSchema } from '@/types/input-field.type'
import { CustomSelectInputProps } from '@/types/props.type'
import Image from 'next/image';
import React, { useDeferredValue, useEffect } from 'react'
// import initialData from '@/constants/select-input.placeholder.json'
// import initialNestedData from '@/constants/select-input-nested.placeholder.json'
import { useDetectClickOutside } from 'react-detect-click-outside';
import { motion } from 'framer-motion'

function NoItemPlaceholder() {
    return (
        <div className='bg-tertiary/50 hover:cursor-pointer hover:bg-tertiary p-3 select-none flex flex-row justify-center gap-2 text-center font-semibold text-secondary'>
            <img src='/icons/inbox.svg' className='w-[20px] opacity-30' />
            <p>There is no item to select here</p>
        </div>
    )
}

function SelectInput({ setValue, placeholder, label, name, id, error, multi = false, nested = false, withImage = false, data, defaultValue, searchable = false, required }: CustomSelectInputProps) {
    const [options, setOptions] = React.useState<SelectInputSchema[]>(data || [])

    const defaultSelected = (typeof defaultValue === 'string' || typeof defaultValue === 'number') ?
        (
            nested ?
                options.map(option => option.options)?.flatMap(opt => opt)?.filter(opt => (opt && opt.value == defaultValue)) :
                options.filter(option => option.value == defaultValue).filter(Boolean)
        ) :
        Array.isArray(defaultValue) ? (
            defaultValue.length == 0 ? [] :
                defaultValue.map(val => {
                    if (typeof val == 'string' || typeof val == 'number') {
                        return options.find(option => option.value == val)
                    } else {
                        return val
                    }
                })
        ) :
            typeof defaultValue === 'object' ? [defaultValue as SelectInputSchema] : []


    const [selected, setSelected] = React.useState<Omit<SelectInputSchema, 'options'>[]>(defaultSelected as SelectInputSchema[])
    const [selectedParent, setSelectedParent] = React.useState<SelectInputSchema | null>(null)
    const [computedValue, setComputedValue] = React.useState<string | null>(null)
    const selectRef = React.useRef<HTMLDetailsElement>(null)
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')

    const openDropdown = () => {
        selectRef.current?.setAttribute('open', 'true')
        setOpen(true)
    }

    const closeDropdown = () => {
        selectRef.current?.removeAttribute('open')
        setOpen(false)
    }

    const ref = useDetectClickOutside({ onTriggered: closeDropdown });

    const handleSelect = (value: string) => {
        if (nested) {
            // IF NESTED SET TO TRUE, AND SELECTED PARENT IS NULL, SET SELECTED PARENT
            if (!selectedParent) {
                const selectedParentValue = options.find(option => option.value === value) as SelectInputSchema
                if (selectedParentValue && selectedParentValue.options) {
                    // SET THE DROPDOWN OPTIONS TO THE SELECTED PARENT OPTIONS
                    setSelectedParent(selectedParentValue)
                    setOptions(selectedParentValue.options)
                    openDropdown()
                }
            } else {
                // IF NESTED SET TO TRUE, AND SELECTED PARENT IS NOT NULL, SET SELECT CHILD
                if (selectedParent) {
                    const selectedChildValue = options.find(option => option.value === value) as SelectInputSchema
                    if (multi) {
                        // IF MULTI SELECT IS TRUE, ADD OR REMOVE THE SELECTED CHILD TO THE SELECTED ARRAY
                        if (selected.find(item => item.value == selectedChildValue?.value)) {
                            setSelected(selected.filter(item => item.value != selectedChildValue?.value))
                        } else if (selectedChildValue) {
                            setSelected([...selected, selectedChildValue])
                        }
                    } else {
                        // IF MULTI SELECT IS FALSE, SET THE SELECTED CHILD TO THE SELECTED ARRAY AS THE ONLY ITEM
                        if (selected.find(item => item.value == selectedChildValue?.value)) {
                            setSelected(selected.filter(item => item.value != selectedChildValue?.value))
                        } else {
                            setSelected([selectedChildValue])
                        }
                        setSelectedParent(null)
                        setOptions(data || [])
                        closeDropdown()
                    }
                }
            }
            return
        }

        // IF NESTED SET TO FALSE, SET THE SELECTED VALUE TO THE SELECTED ARRAY
        const selectedValue = options.find(option => option.value === value)
        if (multi) {
            // IF MULTI SELECT IS TRUE, ADD OR REMOVE THE SELECTED VALUE TO THE SELECTED ARRAY
            if (selected.find(item => item.value === selectedValue?.value)) {
                setSelected(selected.filter(item => item.value !== selectedValue?.value))
            } else if (selectedValue) {
                setSelected([...selected, selectedValue])
            }
        } else if (selectedValue) {
            // IF MULTI SELECT IS FALSE, SET THE SELECTED VALUE TO THE SELECTED ARRAY AS THE ONLY ITEM
            setSelected([selectedValue])
            closeDropdown()
        }
    }

    // THIS COMPUTED VALUE IS USED TO DISPLAY THE SELECTED ITEMS IN THE INPUT FIELD
    useEffect(() => {
        if (selected.length === 0) {
            setComputedValue('')
            if (setValue) setValue('')
        } else {
            setComputedValue(selected.map(item => item.label).join(', '))
            if (setValue) setValue(selected.map(item => item.label).join(', '))
        }
    }, [selected])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(e.target.value)
        if (value) {
            const filteredOptions = (multi && !selectedParent) ? data?.filter(option => option.label.toLowerCase().includes(value.toLowerCase())) : options.filter(option => option.label.toLowerCase().includes(value.toLowerCase()))
            setOptions(filteredOptions || [])
        } else {
            setOptions(multi && !selectedParent ? data || [] : data?.find(option => option.value === selectedParent?.value)?.options || [])
        }
    }

    return (
        // REF IS USED TO DETECT CLICK OUTSIDE THE DROPDOWN PARENT DIV ELEMENT TO TRIGGER CLOSE DROPDOWN
        // SELECT REF IS USED TO OPEN AND CLOSE THE DROPDOWN
        <div ref={ref} className='flex flex-col w-full gap-3'>
            {/* <input type="text" id={id} name={name} value={multi ? selected.map(s => s.value) : selected[0]?.value} hidden onChange={() => { }} /> */}
            {
                selected.map((item, i) => (
                    <input type="text" id={id} name={name} value={item.value} key={i} hidden onChange={() => { }} />
                ))
            }
            <p className='self-start capitalize'>
                {label}
                {
                    required &&
                    <span className='text-danger'>*&nbsp;
                        <sup className='text-xs opacity-70'>(required)</sup></span>
                }
            </p>
            <details ref={selectRef} className={`dropdown bg-white rounded-[30px] m-0 p-0 border w-full hover:bg-white outline-none `}>
                {/* SUMMARY HOLDS SELECTED COMPUTED VALUE OR PLACEHOLDER IF THERE IS NO SELECTED VALUE */}
                <summary className={`flex items-center overflow-hidden px-3 justify-between gap-0 rounded-[40px] w-full cursor-pointer input select-none focus:outline-none ${computedValue ? 'text-black' : 'text-gray-400'} ${error ? 'border-danger bg-dangerlight' : 'focus-within:border-primary bg-transparent'}`}
                >

                    <p className='truncate'>{computedValue || (placeholder || 'Select one')}</p>
                    <img src="/icons/chevron-down.svg" alt="" className={`transition-all ${open && 'rotate-180'}`} />
                </summary >
                {/* DROPDOWN LIST STARTS FROM HERE */}
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 my-3 border-2 shadow rounded-box w-full bg-white">
                    {
                        // searchable &&
                        true &&
                        <input type="text" name={`search-${id}`} id={`search-${id}`} placeholder={`Search ${label?.toLowerCase()}...`} className='bg-primary/10 border m-2 p-1 rounded-[10px] w-11/12 focus:border-primary selection:bg-primary selection:text-tertiary caret-primary' value={search} onChange={handleSearch} />
                    }
                    {/* IF THERE IS SELECTED PARENT, THE FOLLOWING COMPONENT APPEARS WITH TITLE OF SELECTED PARENT AND BACK BUTTON */}
                    {selectedParent &&
                        <li
                            onClick={() => {
                                setSelectedParent(null)
                                setOptions(data || [])
                            }}
                        >
                            <div className={`form-control w-full flex flex-row justify-between rounded-none border-b`}>
                                <img src="/icons/arrow-left.svg" alt="" />
                                <label htmlFor='1' className="label-text font-semibold cursor-pointer label w-full flex justify-between text-black text-md">
                                    {selectedParent.label}
                                </label>
                            </div>
                        </li>}
                    {/* DROPDOWN VALUE GOES HERE */}
                    {
                        options?.length == 0 ?
                            (<NoItemPlaceholder />) : options.map((option, i) => {
                                return (
                                    <li
                                        onClick={() => handleSelect(option.value)}
                                        key={option.value}
                                    >
                                        <div className={`form-control w-full flex flex-row justify-between rounded-none ${options.length !== i + 1 && 'border-b'}`}>
                                            {/* IF DROPDOWN IS SET TO HAVE IMAGE INIT, IT WILL BE DISPLAYED HERE */}
                                            {
                                                withImage && <Image width={100} height={100} src={option?.image || ''} alt="" className='max-w-[20px] max-h-[20px' />
                                            }
                                            <label htmlFor='1' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                                {option.label}
                                            </label>
                                            {/* IF THIS ITEM IS IN SELECTED ITEMS LIST, CHECK MARK WILL APPEAR */}
                                            {(nested && !selectedParent) ? <img src="/icons/chevron-right.svg" alt="" /> :
                                                ((nested && selectedParent) || (!nested && !selectedParent)) && selected.find((item => item.value === option.value)) && <img src="/icons/check.svg" alt="" className='w-[20px]' />}
                                        </div>
                                    </li>
                                )
                            })
                    }
                </ul>
            </details>
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default SelectInput