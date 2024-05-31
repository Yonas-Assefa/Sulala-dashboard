'use client'
import React, { ElementRef } from 'react'
import SulalaLogo from "@/components/SulalaLogo";
import Link from 'next/link';
import routes from './sideBarRoutes';
import { usePathname } from 'next/navigation';
import { useDetectClickOutside } from 'react-detect-click-outside';

type Props = {
    isSuperUser: boolean
}
function SideBarNav({ isSuperUser }: Props) {

    const pathname = usePathname()
    const menuRef = React.useRef<ElementRef<'input'>>(null)

    const ref = useDetectClickOutside({
        onTriggered: () => {
            if (menuRef.current && menuRef.current.checked) {
                menuRef.current.checked = false
            }
        }
    })

    return (
        <nav ref={ref} className='md:min-w-[300px] z-50 drop-shadow-lg group md:h-full bg-tertiary fixed md:relative md:w-auto w-full h-auto md:flex flex-col justify-between'>
            <div>
                <div className='flex flex-row justify-between items-center'>
                    <SulalaLogo />
                    <div className='m-2 p-1 md:hidden bg-primary md:bg-transparent rounded-sm'>
                        <input ref={menuRef} type="checkbox" className='peer' hidden name="nav_bar" id="nav_bar" />
                        <label htmlFor="nav_bar" className=' p-1 flex flex-col gap-1'>
                            <div className="bg-tertiary md:bg-primary h-[2px] md:h-[3px] w-[25px] md:w-[18px] group-has-[:checked]:rotate-45 md:rotate-45 md:-translate-y-[2px] group-has-[:checked]:translate-y-[6px] md:group-has-[:checked]:translate-y-[9px] transition-all" />
                            <div className="bg-tertiary md:bg-primary md:hidden h-[2px] w-[25px] group-has-[:checked]:invisible" />
                            <div className="bg-tertiary md:bg-primary h-[2px] md:h-[3px] w-[25px] md:w-[18px] group-has-[:checked]:-rotate-45 md:-rotate-45 md:translate-y-[2px] group-has-[:checked]:-translate-y-[6px] md:group-has-[:checked]:-translate-y-[9px] transition-all" />
                        </label>
                    </div>
                </div>
                <ul className="group-has-[:checked]:flex hidden transition-all md:flex flex-col list-none peer-has-[checked]:hidden">
                    {
                        routes.filter(route => isSuperUser ? route.protected : !route.protected).map((route) => {
                            const isActive = pathname.includes(route.path.split('?')[0])
                            return (
                                <Link href={route.path} key={route.name}>
                                    <li className={`flex gap-3 p-4 ${!isActive ? 'bg-transparent text-[#52565D]' : 'bg-primary text-white'}`} key={route.name}>
                                        <img src={isActive ? route.activeIcon : route.icon} alt="" />
                                        <h6>
                                            {route.name}
                                        </h6>
                                        {route.protected && <img src="/icons/key.svg" alt="" width='10px' />}
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='hidden md:flex md:flex-col md:gap-3'>
                {/* <div className='flex flex-row items-center justify-evenly'>
                    <label className="swap swap-rotate bg-primary rounded-lg p-2 aspect-square">
                        <input type="checkbox" />
                        <svg className="swap-on fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-off fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                    <div className="swap swap-rotate stroke-primary hover:stroke-white bg-white hover:bg-primary rounded-lg p-2 aspect-square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    </div>
                </div> */}
                <div className='m-6 hidden md:flex flex-row gap-3 items-center text-black font-semibold'>
                    <img src="/icons/whatsup-logo.svg" alt="whatsup icon" className='h-[30px] aspect-square' />
                    <Link href={'/support/contact'}>Contact support</Link>
                </div>
            </div>
        </nav>
    )
}

export default SideBarNav