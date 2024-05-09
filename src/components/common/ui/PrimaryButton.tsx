'use client'
import { openModal } from '@/utils/openModal'
import Link from 'next/link'
import React from 'react'

type Props = {
    handleClick?: () => void
    href?: string
    modal?: string
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

function PrimaryButton({ padding, name, handleClick, modal, href, disabled = false }: Props) {

    const handleButtonClick = (e: React.MouseEvent) => {
        if (disabled) e.preventDefault()
        if (handleClick) {
            handleClick()
        }
        if (modal) {
            openModal(modal)
        }
    }

    if (href) {
        return (
            <Link href={href}
                className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80 ${padding && paddings[padding]} ${disabled && 'bg-secondary hover:bg-secondary border-0 text-white cursor-not-allowed'}`}
                onClick={handleButtonClick}
            >
                {name || 'Continue'}
                {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}

            </Link>
        )
    }
    else return (
        <button
            type='submit'
            className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80 ${padding && paddings[padding]}`}
            onClick={handleButtonClick}
            disabled={disabled}
        >
            {name || 'Continue'}
            {/* <img src="/loading.gif" alt="" className='h-[30px]' /> */}

        </button>
    )
}

export default PrimaryButton