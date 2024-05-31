'use strict'
import SulalaLogo from "@/components/SulalaLogo";
import Link from "next/link";
import { redirect } from "next/navigation";


export default function Home() {
  return (
    <div className="">
      <nav className="bg-white flex flex-row justify-between items-center drop-shadow-lg fixed w-full">
        <SulalaLogo />
        <ul className="text-primary font-semibold flex flex-row gap-6 h-full items-center">
          <li className="text-primary font-semibold hover:border-b hover:border-primary transition-all cursor-pointer">About us</li>
          <li className="text-primary font-semibold hover:border-b hover:border-primary transition-all cursor-pointer">Products</li>
          <li className="text-primary font-semibold hover:border-b hover:border-primary transition-all cursor-pointer">Services</li>
          <li className="text-primary font-semibold hover:border-b hover:border-primary transition-all cursor-pointer">Contact us</li>
        </ul>
        <div className=" flex flex-row gap-3 px-3">
          <Link href={'/auth/sign-in'} className="bg-primary border-gray-200 hover:border-primary text-white font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn">Sign in</Link>
          <Link href={'/auth/sign-up'} className="bg-white border-gray-200 hover:border-primary text-primary font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn">Register</Link>
        </div>
      </nav>
      <div className="block h-screen w-screen bg-white text-primary">
        <h1>Sulala Landing page</h1>
      </div>
    </div>
  );
}
