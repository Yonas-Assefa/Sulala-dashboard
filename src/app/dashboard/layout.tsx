import Footer from "@/components/Footer";
import Header from "@/components/SulalaLogo";
import React from "react";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='w-screen h-screen flex flex-row'>
            <div className='w-[300px] h-screen bg-tertiary'>
                <Header />
            </div>
            <div className='bg-white flex-grow'>
                <div className='w-full h-full flex justify-between flex-col items-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}