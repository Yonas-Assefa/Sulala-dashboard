'use client'
import { useCreateQueryString } from '@/hooks/useCreateQueryString'
import Link from 'next/link'
import React from 'react'

function PhoneEmailTab() {
    const { createQueryString, searchParams } = useCreateQueryString()
    return (
        <div className='flex tabs gap-4 w-full px-10' role='tablist'>
            <Link href={createQueryString('by', 'phone')}
                className={`w-1/2 p-2 text-center ${searchParams.get('by') !== 'email' && 'text-primary border-b-2 border-primary'}`}
            >
                Via phone number
            </Link>
            <Link href={createQueryString('by', 'email')}
                className={`w-1/2 p-2 text-center ${searchParams.get('by') === 'email' && 'text-primary border-b-2 border-primary'}`}
            >
                Via email
            </Link>
        </div>
    )
}

export default PhoneEmailTab