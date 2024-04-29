import React from 'react'

type Props = {
    onClick?: () => void
    padding?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
    name?: string
}

const paddings = {
    xsm: 'px-[50px]',
    sm: 'px-[80px]',
    md: 'px-[100px]',
    lg: 'px-[200px]',
    xlg: 'px-[300px]'
}

function PrimaryButton({ padding, name, onClick }: Props) {
    return (
        <button
            className={`btn rounded-[40px] bg-secondary border-0 text-white hover:bg-primary ${padding && paddings[padding]}`}
            onClick={onClick}>
            {name || 'Continue'}
            {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}

        </button>
    )
}

export default PrimaryButton