'use client'
import { logout } from '@/actions/common/logout'
import { useParams } from 'next/navigation'
import React from 'react'

function SideBarOptions() {
    const [isPending, startTransition] = React.useTransition()
    const { lang } = useParams()

    const handleLogoutClick = async () => {
        startTransition(async () => {
            await logout()
        })
    }
    return (
        <div className="md:dropdown md:dropdown-top dropdown-end w-full md:w-auto">
            <div tabIndex={0} role="button" className="p-2 hidden md:block">
                <img src="/icons/more-horizontal.svg" alt="" />
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] bg-tertiary menu p-2 md:shadow md:drop-shadow-lg rounded-box hidden group-has-[:checked]:block md:block">
                <div className='flex flex-row items-center justify-end gap-3 px-4'>
                    {/* LANGUAGE */}
                    <button className="swap bg-white hover:bg-primary text-primary hover:text-white rounded-lg p-2 aspect-square">
                        <div className={lang == 'en' ? 'swap-on' : 'swap-off'}>EN</div>
                        <div className={lang == 'ar' ? 'swap-on' : 'swap-off'}>AR</div>
                    </button>
                    {/* THEME */}
                    <label className="swap swap-rotate bg-white hover:bg-primary fill-primary hover:fill-white rounded-lg p-2 aspect-square">
                        <input type="checkbox" />
                        <svg className="swap-on w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-off w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                    {/* LOGOUT */}
                    <button onClick={handleLogoutClick} className="swap swap-rotate text-primary hover:text-white stroke-primary hover:stroke-white bg-white hover:bg-primary rounded-lg p-2 aspect-square">
                        {isPending ? <span className="loading loading-spinner w-5 h-5"></span> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBarOptions