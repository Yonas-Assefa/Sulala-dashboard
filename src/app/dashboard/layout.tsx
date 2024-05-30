import React from "react";
import SideBarNav from "./components/SideBarNav";
import { Metadata } from "next";
import { getShopInfo } from "@/actions/settings/get-shop-info";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Sulala | Dashboard',
    description: 'Sulala is market place.',
    icons: [
        '/sulala-logo.svg',
    ]
};


export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    try {
        const shopInfo = await getShopInfo()
        if (shopInfo.certificates && Array.isArray(shopInfo.certificates) && shopInfo.certificates.length == 0) {
            redirect('/auth/setup-account?stage=one')
        }
    } catch (error: unknown) {
        if (error && typeof error == 'object' && 'message' in error && typeof error.message == 'string' && error.message.includes("don't have a shop")) {
            console.error('Please set up your shop to start buying and selling goods and services.')
            redirect('/auth/setup-account?stage=one')
        }
    }

    return (
        <>
            <div className='w-screen h-screen overflow-hidden flex md:flex-row flex-col'>
                <SideBarNav />
                <div className='bg-white overflow-y-scroll flex-grow'>
                    <div className='w-full h-full mt-8 flex justify-between flex-col items-center'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}