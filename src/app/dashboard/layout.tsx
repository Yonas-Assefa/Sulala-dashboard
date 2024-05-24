import React from "react";
import SideBarNav from "./components/SideBarNav";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sulala | Dashboard',
    description: 'Sulala is market place.',
    icons: [
        '/sulala-logo.svg',
    ]
};


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className='w-screen h-screen flex flex-row'>
                <SideBarNav />
                <div className='bg-white flex-grow'>
                    <div className='w-full h-full flex justify-between flex-col items-center'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}