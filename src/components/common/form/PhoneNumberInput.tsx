'use client'
import React, { ElementRef } from 'react'
import countries from '@/constants/countries.json'
import ResetButton from '../ui/ResetButton'
import { getUserLocation } from '@/utils/getUserLocation'

function PhoneNumberInput({ error }: { error?: string }) {
    type CountryCode = {
        name: string,
        dial_code: string,
        code: string,
        flag: string
    }

    const [phone, setPhone] = React.useState('')
    const [countryCode, setCountryCode] = React.useState<CountryCode>()
    const phoneInputRef = React.useRef<ElementRef<'input'>>(null)
    const countryCodeRef = React.useRef<ElementRef<'details'>>(null)
    const [filterCountry, setFilterCountry] = React.useState('')

    // CLOSE DROPDOWN WHEN CLICKED OUTSIDE
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (countryCodeRef.current && !countryCodeRef.current.contains(e.target as Node)) {
                countryCodeRef.current.removeAttribute('open')
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    // GET USER LOCATION AND SET DEFAULT COUNTRY DIAL CODE
    React.useEffect(() => {
        getUserLocation()
            .then(data => {
                const country = countries.find((country: CountryCode) => country.code === data.country_code)
                setCountryCode(country)
            })
    }, [])

    const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (+value || value === '') {
            setPhone(value)
        }
    }

    const clearPhoneNumber = () => {
        setPhone('')
        phoneInputRef.current?.focus()
    }

    const selectCountryCode = (country: CountryCode) => {
        setCountryCode(country)
        countryCodeRef.current?.removeAttribute('open')
        phoneInputRef.current?.focus()
    }

    const handleFilterCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCountry(e.target.value)
    }

    const applyCountryFilter = (country: CountryCode) => {
        const filter = filterCountry.toLowerCase();
        return filter === '' ||
            country.name.toLowerCase().includes(filter) ||
            country.dial_code.includes(filter);
    };

    return (
        <>
            <label htmlFor="phone-number" className='self-start'>Phone number</label>
            <div className='w-full'>
                <div className={`flex items-center gap-0 border rounded-[40px] w-full ${error ? 'bg-dangerlight border-danger' : 'focus-within:border-primary'}`}>
                    <details className="dropdown relative bg-transparent h-full" ref={countryCodeRef}>
                        {/* DISPLAYING COUNTRY FLAG, AND COUNTRY DIAL CODE */}
                        <summary className='min-w-[80px] bordered bg-transparent h-full select-none cursor-pointer flex gap-1 items-center justify-center px-5'>
                            <span>{countryCode?.flag}</span>
                            <p>{countryCode?.dial_code}</p>
                            <img src="/icons/chevron-down.svg" className='w-[15px] ml-2' alt="" />
                        </summary>
                        <input type="text" id='country_code' name='country_code' hidden value={countryCode?.dial_code} />
                        {/* DROPDOWN OPTION STARTS FROM HERE */}
                        <ul tabIndex={0} className="dropdown absolute max-h-[300px] overflow-y-scroll z-[1] menu p-0 mt-4 border-2  shadow rounded-box w-52 bg-white block">
                            <input type="text" name="search-country" placeholder='Search countries' className='bg-white border m-2 p-1 rounded-[10px] w-11/12' value={filterCountry} onChange={handleFilterCountry} id="" />
                            {
                                countries
                                    .filter((country) => applyCountryFilter(country))
                                    .map((country) => (
                                        <li className={`flex flex-row w-full rounded-md hover:bg-gray-100 ${countryCode?.code == country.code ? 'bg-gray-400/20' : ''}`} onClick={() => selectCountryCode(country)} key={country.code}>
                                            <div className='hover:bg-transparent focus:bg-transparent active:bg-transparent w-full flex justify-between tooltip' data-tip={country.name}>
                                                <div className='flex flex-row justify-start gap-3 truncate'>
                                                    <span>{country.flag}</span>
                                                    <span>{country.dial_code}</span>
                                                    <span className='truncate'>{country.name}</span>
                                                </div>
                                                {countryCode?.code == country.code && <img src="/icons/check.svg" className='bg-transparent' alt="check-mark" />}
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </details>
                    {/* PHONE NUMBER INPUT AND CLEAR BUTTON */}
                    <div className={`flex border-l w-full justify-between pr-3 ${error ? 'border-danger' : 'focus-within:border-primary'}`}>
                        <input
                            type="text"
                            id='phone_number'
                            name='phone_number'
                            placeholder="Enter phone number"
                            className="input w-full bg-transparent border-0 outline-0 rounded-r-[30px] focus:border-0 focus:outline-none"
                            onChange={handlePhoneNumber}
                            value={phone}
                            ref={phoneInputRef}
                            autoComplete="disabled"
                        />

                        <ResetButton handleClear={clearPhoneNumber} show={!!phone} />
                    </div>
                </div>
                {error && <span className="text-xs text-danger">
                    {error}
                </span>}
            </div>

        </>
    )
}

export default PhoneNumberInput