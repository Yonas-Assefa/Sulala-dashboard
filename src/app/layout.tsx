import type { Metadata } from "next";
import { Suspense } from 'react'
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageSuspense from "@/components/common/ui/PageSuspense";
import { CounterStoreProvider } from '@/providers/setup-account-store-provider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sulala",
  description: "Sulala is a platform for selling and buying goods and services.",
  icons: [
    '/sulala-logo.svg',
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ToastContainer hideProgressBar={true} newestOnTop={false} draggable className='select-none' />
        <Suspense fallback={<PageSuspense />}>
          <CounterStoreProvider>
            {children}
          </CounterStoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
