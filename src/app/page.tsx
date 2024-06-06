import { redirect } from 'next/navigation'
import React from 'react'

function page() {
    redirect('/ar')
    return (
        <div></div>
    )
}

export default page