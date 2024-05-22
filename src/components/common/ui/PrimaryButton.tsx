'use client'
import { openModal } from '@/lib/modals'
import Link from 'next/link'
import React from 'react'
import { useFormStatus } from 'react-dom'

type Props = {
    handleClick?: () => void
    href?: string
    modal?: string
    padding?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg'
    name?: string
    disabled?: boolean
    type?: 'submit' | 'reset' | 'button'
    ref?: React.RefObject<HTMLButtonElement>
    className?: string
}

const paddings = {
    xsm: 'px-[50px]',
    sm: 'px-[80px]',
    md: 'px-[100px]',
    lg: 'px-[200px]',
    xlg: 'px-[300px]'
}

function PrimaryButton({ padding, name, handleClick, className, modal, ref, href, type, disabled = false }: Props) {

    const { pending } = useFormStatus();

    const handleButtonClick = (e: React.MouseEvent) => {
        if (disabled) e.preventDefault()
        if (handleClick) {
            handleClick()
        }
        if (modal) {
            openModal(modal)
        }
    }

    const props = {}
    if (handleButtonClick && type !== 'submit') {
        Object.assign(props, { onClick: handleButtonClick })
    }
    if (type) {
        Object.assign(props, { type })
    }
    if (ref) {
        Object.assign(props, { ref })
    }

    if (href) {
        return (
            <Link href={href}
                className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary  hover:bg-primary/80 ${padding && paddings[padding]} ${(disabled || pending) && 'bg-secondary hover:bg-secondary border-0 text-white cursor-not-allowed'}`}
                onClick={handleButtonClick}
            >
                {
                    pending ? <span className="loading loading-spinner loading-md text-primary"></span> :
                        (name || 'Continue')
                }

            </Link>
        )
    }
    else return (
        <button
            className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary hover:bg-primary/80 ${padding && paddings[padding]} ${className}`}
            disabled={disabled || pending}
            {...props}
        >
            {
                pending ? <span className="loading loading-spinner loading-md text-primary"></span> :
                    (name || 'Continue')
            }
        </button>
    )
}

export default PrimaryButton