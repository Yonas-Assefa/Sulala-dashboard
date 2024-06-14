import React from 'react'
import LangSwitch from '../../components/LangSwitch';
import ThemeSwitch from '../../components/ThemeSwitch';
import LogoutSwitch from '../../components/LogoutSwitch';

function SideBarOptions() {
    return (
        <div className="md:dropdown md:dropdown-top dropdown-end w-full md:w-auto">
            <div tabIndex={0} role="button" className="p-2 hidden md:block">
                <img src="/icons/more-horizontal.svg" alt="" />
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] bg-tertiary menu p-2 md:shadow md:drop-shadow-lg rounded-box hidden group-has-[:checked]:block md:block">
                <div className='flex flex-row items-center justify-end gap-3 px-4'>
                    {/* LANGUAGE */}
                    <LangSwitch />
                    {/* THEME */}
                    <ThemeSwitch />
                    {/* LOGOUT */}
                    <LogoutSwitch />
                </div>
            </div>
        </div>
    )
}

export default SideBarOptions