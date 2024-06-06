import Footer from "@/components/common/ui/Footer";
import SulalaLogo from "@/components/SulalaLogo";
import React from "react";
import { Metadata } from "next";
import landingImage from '@/../public/landing.png'
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
    title: 'Sulala | Auth',
    description: 'Sulala authentication.',
    icons: [
        '/sulala-logo.svg',
    ]
};

export default function AuthPageLayout({ children, params }: Readonly<{ children: React.ReactNode, params: { lang: string } }>) {
    unstable_setRequestLocale(params.lang);
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
                            <Link href={'/auth/sign-in'} locale={params.lang == 'en' ? 'ar' : 'en'} className="swap bg-white hover:bg-primary text-primary hover:text-white rounded-lg p-2 aspect-square" >
                                <div className={params.lang == 'en' ? 'swap-on' : 'swap-off'}>EN</div>
                                <div className={params.lang == 'ar' ? 'swap-on' : 'swap-off'}>AR</div>
                            </Link>
                            {/* THEME */}
                            <label className="swap swap-rotate bg-white hover:bg-primary fill-primary hover:fill-white rounded-lg p-2 aspect-square">
                                <input type="checkbox" />
                                <svg className="swap-on w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                                <svg className="swap-off w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                            </label>
                        </div>
                    </div>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}