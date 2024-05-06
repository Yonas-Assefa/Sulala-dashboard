'use client'
import PhoneNumberInput from '@/components/common/PhoneNumberInput'
import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import TextInput from '@/components/common/TextInput'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'
import PersonalInfo from '../components/PersonalInfo'
import ShopInfo from '../components/ShopInfo'
import BillingInfo from '../components/BillingInfo'
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
            <div className='text-black flex flex-col w-full h-full p-8 gap-10'>
                <h1 className='text-5xl font-semibold font-serif'>Settings</h1>

                <div className='box-content border-b-2 border-secondary'>
                    <div className="self-start font-medium flex flex-row">
                        <Link href={'/dashboard/settings/personal-info'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'personal-info' ? 'text-primary border-primary' : 'text-secondary border-secondary'}`}>Personal Info</Link>
                        <Link href={'/dashboard/settings/shop-info'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'shop-info' ? 'text-primary border-primary' : 'text-secondary border-secondary'}`}>Shop Info</Link>
                        <Link href={'/dashboard/settings/billing-info'} className={`tab border-b-2 px-6 -mb-[1px] ${activeTab == 'billing-info' ? 'text-primary border-primary' : 'text-secondary border-secondary'}`}>Billing Info</Link>
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