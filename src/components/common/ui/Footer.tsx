import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='text-[#a2a6ac] p-8'>
            Have a question? <Link href={'/contact'} className='text-primary font-semibold'>Contact support</Link>
        </div>
    )
}

export default Footer