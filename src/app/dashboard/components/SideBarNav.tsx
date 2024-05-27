'use client'
import React from 'react'
import SulalaLogo from "@/components/SulalaLogo";
import Link from 'next/link';
import routes from './sideBarRoutes';
import { usePathname } from 'next/navigation';

function SideBarNav() {

    const pathname = usePathname()

    return (
        <nav className='md:min-w-[300px] z-50 drop-shadow-lg group md:h-full bg-tertiary fixed md:relative md:w-auto w-full h-auto md:flex flex-col justify-between'>
            <div>
                <div className='flex flex-row justify-between items-center'>
                    <SulalaLogo />
                    <div className='m-2 p-1 md:hidden bg-primary rounded-sm'>
                        <input type="checkbox" className='peer' hidden name="nav_bar" id="nav_bar" />
                        <label htmlFor="nav_bar" className=' p-1 flex flex-col gap-1'>
                            <div className="bg-tertiary h-[2px] w-[25px] group-has-[:checked]:rotate-45 group-has-[:checked]:translate-y-[6px] transition-all" />
                            <div className="bg-tertiary h-[2px] w-[25px] group-has-[:checked]:invisible" />
                            <div className="bg-tertiary h-[2px] w-[25px] group-has-[:checked]:-rotate-45 group-has-[:checked]:-translate-y-[6px] transition-all" />
                        </label>
                    </div>
                </div>
                <ul className="group-has-[:checked]:flex hidden transition-all md:flex flex-col list-none peer-has-[checked]:hidden">
                    {
                        routes.map((route) => {
                            const isActive = pathname.includes(route.path.split('?')[0])
                            return (
                                <Link href={route.path} key={route.name}>
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
            <div className='m-6 hidden md:flex flex-row gap-3 items-center text-black font-semibold'>
                <img src="/icons/whatsup-logo.svg" alt="whatsup icon" className='h-[30px] aspect-square' />
                <Link href={'/support/contact'}>Contact support</Link>
            </div>
        </nav>
    )
}

export default SideBarNav