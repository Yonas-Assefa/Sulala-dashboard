'use client'
import Link from 'next/link'
import React from 'react'
import PersonalInfo from '../components/PersonalInfo/page'
import ShopInfo from '../components/ShopInfo/page'
import BillingInfo from '../components/BillingInfo/page'
import LogoutModal from '../components/modals/LogoutModal'
import ChangePasswordModal from '../components/modals/ChangePasswordModal'
import CreatePaymentMethodModal from '../components/modals/createPaymentMethodModal'

type Props = {
    params: {
        tab: string[]
    }
}

function SettingsPage({ params: { tab } }: Props) {
    const activeTab = tab ? tab[0] : 'personal-info'
    return (
        <>
            <LogoutModal />
            <ChangePasswordModal />
            <CreatePaymentMethodModal />
            <div className='text-black flex flex-col w-full h-full p-8 gap-10 overflow-y-scroll'>
                <h1 className='text-5xl font-semibold font-serif'>Settings</h1>

                <div className='box-content border-b-2 border-secondary'>
                    <div className="self-start font-medium flex flex-row">
                        <Link href={'/dashboard/settings/personal-info'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'personal-info' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Personal Info</Link>
                        <Link href={'/dashboard/settings/shop-info'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'shop-info' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Shop Info</Link>
                        <Link href={'/dashboard/settings/billing-info'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'billing-info' ? 'text-primary border-primary' : 'text-secondary border-transparent'}`}>Billing Info</Link>
                    </div>
                </div>

                {/* TAB CONTENTS HERE */}
                {
                    activeTab == 'personal-info' ?
                        <PersonalInfo /> :
                        activeTab == 'shop-info' ?
                            <ShopInfo /> :
                            activeTab == 'billing-info' ?
                                <BillingInfo /> :
                                null
                }
            </div>
        </>
    )
}

export default SettingsPage