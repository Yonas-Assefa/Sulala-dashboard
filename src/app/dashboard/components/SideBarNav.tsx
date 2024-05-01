'use client'
import React from 'react'
import Header from "@/components/SulalaLogo";
import Link from 'next/link';
import routes from './sideBarRoutes';
import { usePathname } from 'next/navigation';

function SideBarNav() {

    const pathname = usePathname()

    return (
        <nav className='min-w-[300px] h-screen bg-tertiary flex flex-col justify-between'>
            <div>
                <Header />
                <ul className="flex flex-col list-none">
                    {
                        routes.map((route) => {
                            const isActive = pathname.includes(route.path)
                            return (
                                <Link href={route.path}>
                                    <li className={`flex gap-3 p-4 ${!isActive ? 'bg-transparent text-[#52565D]' : 'bg-primary text-white'}`} key={route.name}>
                                        <img src={isActive ? route.activeIcon : route.icon} alt="" />
                                        <h6>
                                            {route.name}
                                        </h6>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='m-6 flex flex-row gap-3 items-center text-black font-semibold'>
                <img src="/icons/whatsup-logo.svg" alt="whatsup icon" className='h-[30px] aspect-square' />
                <Link href={'/contact'}>Contact support</Link>
            </div>
        </nav>
    )
}

export default SideBarNav