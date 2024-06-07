import Footer from "@/components/common/ui/Footer";
import SulalaLogo from "@/components/SulalaLogo";
import React from "react";
import { Metadata } from "next";
import landingImage from '@/../public/landing.png'
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LangSwitch from "../components/LangSwitch";
import ThemeSwitch from "../components/ThemeSwitch";

export const metadata: Metadata = {
    title: 'Sulala | Auth',
    description: 'Sulala authentication.',
    icons: [
        '/sulala-logo.svg',
    ]
};

export default function AuthPageLayout({ children, params }: Readonly<{ children: React.ReactNode, params: { lang: string } }>) {
    return (
        <div className='w-screen h-screen bg-blue-500 flex flex-row'>
            <div className='w-9/12 md:block hidden'>
                {/* <img src="/landing.png" alt="" className='w-full h-full' /> */}
                <Image src={landingImage} alt="" className='w-full h-full' />
            </div>
            <div className='bg-white md:w-3/12 overflow-y-scroll w-full md:min-w-[600px]'>
                <div className='w-full h-full flex justify-between flex-col items-center'>
                    <div className="flex flex-row justify-between w-full">
                        <SulalaLogo />
                        <div className='flex flex-row items-center justify-end gap-3 px-4'>
                            {/* LANGUAGE */}
                            <LangSwitch />
                            {/* THEME */}
                            <ThemeSwitch />
                        </div>
                    </div>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}