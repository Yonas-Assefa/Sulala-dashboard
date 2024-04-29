import React, { ElementRef } from 'react'

function OTPInput({ submitBtn }: { submitBtn: React.RefObject<ElementRef<'button'>> }) {

    const [otp, setOTP] = React.useState<string[]>(['', '', '', '', '', ''])

    const input1 = React.useRef<ElementRef<'input'>>(null)
    const input2 = React.useRef<ElementRef<'input'>>(null)
    const input3 = React.useRef<ElementRef<'input'>>(null)
    const input4 = React.useRef<ElementRef<'input'>>(null)
    const input5 = React.useRef<ElementRef<'input'>>(null)
    const input6 = React.useRef<ElementRef<'input'>>(null)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.target.name.slice(-1))
        setOTP(otp.map((value, i) => i === index - 1 ? e.target.value : value))
        if (e.target.value) {
            if (index < 6) {
                switch (index) {
                    case 1:
                        input2.current?.focus()
                        break
                    case 2:
                        input3.current?.focus()
                        break
                    case 3:
                        input4.current?.focus()
                        break
                    case 4:
                        input5.current?.focus()
                        break
                    case 5:
                        input6.current?.focus()
                        break
                }
            }
            if (index === 6) {
                submitBtn.current?.focus()
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('Text')
        if (paste.length >= 6) {
            setOTP(paste.split('').slice(0, 6))
            submitBtn.current?.focus()
        } else {
            setOTP(paste.split(''))
        }
    }


    return (
        <div className='flex flex-row gap-0 w-full items-center my-8 justify-between'>
            {
                Array.from({ length: 6 }).map((_, index) => {
                    return <input
                        key={index}
                        type='text'
                        name={`input${index + 1}`}
                        className='w-14 h-14 border-2 border-gray-300 bg-white focus:border-primary rounded-full text-center text-2xl'
                        maxLength={1}
                        pattern="\d*"
                        ref={eval(`input${index + 1}`)}
                        onChange={handleInput}
                        onPaste={handlePaste}
                        value={otp[index] || ''}
                    />
                })
            }
        </div>
    )
}

export default OTPInput