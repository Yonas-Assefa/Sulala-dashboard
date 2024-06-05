'use client'
import { openModal } from '@/lib/modals'
import Link from 'next/link'
import React from 'react'

type Props = {
    href?: string
    modal?: string
    handleClick?: () => void
    name: string
    padding?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
    type?: 'submit' | 'reset' | 'button'
}

function SecondaryButton({ href, name, padding, modal, type, handleClick }: Props) {
    const paddings = {
        xsm: 'px-[10px]',
        sm: 'px-[30px]',
        md: 'px-[100px]',
        lg: 'px-[200px]',
        xlg: 'px-[300px]'
    }

    const handleButtonClick = () => {
        if (handleClick) {
            handleClick()
        }
        if (modal) {
            openModal(modal)
        }
    }
    const props = {}

    if (handleButtonClick) {
        Object.assign(props, { onClick: handleButtonClick })
    }
    if (type) {
        Object.assign(props, { type })
    }

    if (href) {
        return (
            <Link href={href} className={`btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-secondary/40 border-0 text-black ${padding && paddings[padding]}`}>
                {name}
            </Link>
        )
    } else {
        return (<button
            className={`btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-secondary/40 border-0 text-black ${padding && paddings[padding]}`}
            {...props}
        >
            {name}
        </button>)
    }
}

export default SecondaryButton