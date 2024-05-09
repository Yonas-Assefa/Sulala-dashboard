import React from 'react'

type Props = {
    onClick?: () => void
    padding?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
    name?: string
    disabled?: boolean
}

const paddings = {
    xsm: 'px-[50px]',
    sm: 'px-[80px]',
    md: 'px-[100px]',
    lg: 'px-[200px]',
    xlg: 'px-[300px]'
}

function PrimaryButton({ padding, name, onClick, disabled = false }: Props) {
    return (
        <button
            type='submit'
            className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80 ${padding && paddings[padding]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {name || 'Continue'}
            {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}

        </button>
    )
}

export default PrimaryButton