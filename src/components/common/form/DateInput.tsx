'use client'
import React from 'react'
type Props = {
    label: string
    setValue?: (value: string) => void
    id?: string
    name?: string
    error?: string
}

function DateInput({ label, setValue, id, name, error }: Props) {
    const [time, setTime] = React.useState<string>('')
    const [date, setDate] = React.useState<string>('')

    const dateInputRef = React.useRef<HTMLInputElement>(null);
    const timeInputRef = React.useRef<HTMLInputElement>(null);

    const openDateDropdown = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    const openTimeDropdown = () => {
        if (timeInputRef.current) {
            timeInputRef.current.showPicker();
        }
    };

    const props = {
        dateProps: {
            value: date,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)
        },
        timeProps: {
            value: time,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)
        },
    }

    const createDateTime = () => {
        if (!date || !time) return ''
        const dateTime = new Date(`${date}T${time}:00`)
        console.log({ dateTime, toString: dateTime.toLocaleString(), date, time })
        return dateTime.toLocaleString()
    }

    React.useEffect(() => {
        if (setValue) {
            const datetime = createDateTime()
            setValue(datetime)
        }
    }, [date, time])

    return (
        <div>
            <p>{label}</p>
            <div className='flex flex-row p-2 gap-2 w-full flex-wrap'>
                <input type="text" name={name} id={id} hidden value={(new Date(`${date || '2020-01-01'}T${time || '00:00'}:00`)).toISOString()} />
                <label htmlFor={`${name}-date`} className={`border rounded-[30px] py-2 px-4 flex flex-row justify-between gap-3 ${error ? 'bg-dangerlight border-danger' : 'bg-white'}`}>
                    <input onFocus={openDateDropdown} ref={dateInputRef} type="date" name={`${name}-date`} id={`${name}-date`} className='bg-transparent border-0 outline-none max-w-[150px]' placeholder='DD.MM.YYYY' {...props.dateProps} />
                    <img src="/icons/calendar.svg" alt="" />
                </label>
                <label htmlFor={`${name}-time`} className={`border rounded-[30px] py-2 px-4 flex flex-row justify-between gap-3 ${error ? 'bg-dangerlight border-danger' : 'bg-white'}`}>
                    <input onFocus={openTimeDropdown} ref={timeInputRef} type="time" name={`${name}-time`} id={`${name}-time`} className='bg-transparent border-0 outline-none max-w-[150px]' placeholder='00 : 00 AM' {...props.timeProps} />
                    <img src="/icons/watch.svg" alt="" />
                </label>
            </div>
            {error && <span className="text-xs text-danger">
                {error}
            </span>}
        </div>
    )
}

export default DateInput