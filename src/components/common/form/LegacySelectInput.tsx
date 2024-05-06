import { SelectInputProps } from '@/types/props.type'
import React from 'react'

function SelectInput({ value, onChange, placeholder, label, name, autoComplete, error, onClear, multi, ...props }: SelectInputProps) {

    const [selected, setSelected] = React.useState(value)
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <label htmlFor="email-address" className='self-start'>{label}</label>
            {/* <div className='flex items-center px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full cursor-pointer'>
                <div className="input w-full max-w-xs bg-white rounded-r-[30px] focus:border-0 focus:outline-none flex items-center justify-start text-gray-400">
                    <p>{value || placeholder}</p>
                </div>
                <img src="/icons/chevron-up.svg" alt="" />
            </div > */}
            <div className={`dropdown bg-white rounded-[30px] m-0 p-0 border-0 w-full hover:bg-white outline-none ${open && 'dropdown-open'}`}>
                <div className='flex items-center px-3 justify-between gap-0 border focus-within:border-primary rounded-[40px] w-full cursor-pointer'>
                    <button className="input w-full max-w-xs bg-transparent select-none focus:border-0 focus:outline-none flex items-center justify-start text-gray-400">
                        <p>{value || placeholder}</p>
                    </button>
                    {open ?
                        <img src="/icons/chevron-up.svg" alt="" /> :
                        <img src="/icons/chevron-down.svg" alt="" />}
                </div >
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 my-3 border-2 shadow rounded-box w-full bg-white">
                    <li>
                        <div className="form-control w-full flex flex-row justify-between">
                            <label htmlFor='1' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                Pet foods and treats
                            </label>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success" id="1" />
                        </div>
                    </li>
                    <li>
                        <div className="form-control w-full flex flex-row justify-between">
                            <label htmlFor='2' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                Pets accessories
                            </label>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success" id="2" />
                        </div>
                    </li>
                    <li>
                        <div className="form-control w-full flex flex-row justify-between">
                            <label htmlFor='3' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                Health and wellness
                            </label>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success" id="3" />
                        </div>
                    </li>
                    <li>
                        <div className="form-control w-full flex flex-row justify-between">
                            <label htmlFor='4' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                Cleaning and hygiene
                            </label>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success" id="4" />
                        </div>
                    </li>
                    <li>
                        <div className="form-control w-full flex flex-row justify-between">
                            <label htmlFor='5' className="label-text cursor-pointer label w-full flex justify-between text-black text-md">
                                Travel and transportations
                            </label>
                            <input type="checkbox" defaultChecked className="checkbox checkbox-success" id="5" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SelectInput