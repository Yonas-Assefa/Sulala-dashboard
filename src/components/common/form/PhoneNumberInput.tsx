import React, { ElementRef } from 'react'
import countries from '../../constants/countries.json'

function PhoneNumberInput() {
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
        if (filterCountry === '') {
            return true
        }
        return country.name.toLowerCase().includes(filterCountry.toLowerCase()) || country.dial_code.includes(filterCountry)
    }
    return (
        <>
            <label htmlFor="phone-number" className='self-start'>Phone number</label>
            <div className='flex items-center gap-0 border focus-within:border-primary rounded-[40px] w-full'>
                <details className="dropdown relative bg-transparent h-full" ref={countryCodeRef}>
                    <summary className='min-w-[80px] bordered bg-transparent h-full select-none cursor-pointer flex gap-1 items-center justify-center px-5'>
                        <span>{countryCode?.flag}</span>
                        <p>{countryCode?.dial_code}</p>
                        <img src="/icons/chevron-down.svg" className='w-[15px] ml-2' alt="" />
                    </summary>
                    <ul tabIndex={0} className="dropdown absolute max-h-[300px] overflow-y-scroll z-[1] menu p-0 mt-4 border-2  shadow rounded-box w-52 bg-white block">
                        <input type="text" name="search-country" placeholder='Search countries' className='bg-white border m-2 p-1 rounded-[10px] w-11/12' value={filterCountry} onChange={handleFilterCountry} id="" />
                        {
                            countries.filter((ele) => applyCountryFilter(ele)).map((country, index) => {
                                return (<li className='flex flex-row' onClick={() => selectCountryCode(country)} key={country.code}>
                                    <p>{country.flag} <span>{country.dial_code} </span> {country.name}</p>
                                </li>)
                            })
                        }
                    </ul>
                </details>
                <div className='flex border-l-2 w-full justify-between pr-3 focus-within:border-primary'>
                    <input
                        type="text"
                        id='phone-input'
                        placeholder="Type here"
                        className="input w-full bg-transparent border-0 outline-0 rounded-r-[30px] focus:border-0 focus:outline-none"
                        onChange={handlePhoneNumber}
                        value={phone}
                        ref={phoneInputRef}
                    />

                    <button
                        className={!phone ? 'invisible' : 'visible'}
                        onClick={clearPhoneNumber}>
                        <img src="/x-circle.svg" alt="" className='mr-0 stroke-emerald-500' />
                    </button>

                </div>
            </div>
        </>
    )
}

export default PhoneNumberInput