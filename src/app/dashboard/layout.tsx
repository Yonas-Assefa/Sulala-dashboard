import React from "react";
import SideBarNav from "./components/SideBarNav";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";

export const metadata: Metadata = {
    title: 'Sulala | Dashboard',
    description: 'Sulala is market place.',
    icons: [
        '/sulala-logo.svg',
    ]
};


export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    // const personalInfo = await getPersonalInfo()
    // if (!personalInfo?.email_verified) {
    //     redirect('/auth/verify-email')
    // }
    // if (!personalInfo?.is_password_set && personalInfo?.email && !personalInfo?.phone_verified) {
    //     redirect('/auth/create-password')
    // }
    // if (personalInfo.shops && Array.isArray(personalInfo.shops) && personalInfo.shops.length > 0) {
    //     console.info('shop info set up')
    // } else {
    //     redirect('/auth/setup-account?stage=one')
    // }

    // console.log({ personalInfo, is_superuser: personalInfo?.is_superuser })

    const personalInfo = { is_superuser: true }
    return (
        <>
            <div className='w-screen h-screen overflow-hidden flex md:flex-row flex-col'>
                <SideBarNav isSuperUser={personalInfo?.is_superuser} />
                <div className='bg-white overflow-y-scroll flex-grow'>
                    <div className='w-full h-full mt-8 flex justify-between flex-col items-center'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}