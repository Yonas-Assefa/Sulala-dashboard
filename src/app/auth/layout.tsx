import Footer from "@/components/common/ui/Footer";
import SulalaLogo from "@/components/SulalaLogo";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sulala | Auth',
    description: 'Sulala authentication.',
    icons: [
        '/sulala-logo.svg',
    ]
};

export default function AuthPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='w-screen h-screen bg-blue-500 flex flex-row'>
            <div className='w-9/12'>
                <img src="/landing.png" alt="" className='w-full h-full' />
            </div>
            <div className='bg-white w-3/12 min-w-[600px]'>
                <div className='w-full h-full flex justify-between flex-col items-center'>
                    <SulalaLogo />
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}