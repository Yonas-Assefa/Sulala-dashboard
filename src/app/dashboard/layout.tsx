import Footer from "@/components/common/ui/Footer";
import Header from "@/components/SulalaLogo";
import Link from "next/link";
import React from "react";
import SideBarNav from "./components/SideBarNav";

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