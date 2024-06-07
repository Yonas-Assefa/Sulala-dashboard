import { Suspense } from 'react'
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageSuspense from "@/components/common/ui/PageSuspense";
import { SetupAccountStoreProvider } from '@/providers/setup-account-store-provider'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {

  const t = await getTranslations({ locale, namespace: 'LandingMetadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: [
      '/sulala-logo.svg',
    ],
    openGraph: {
      images: ['/sulala-logo.svg'],
      title: t('title')
    },
  };
}

export default async function AppLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ToastContainer hideProgressBar={true} newestOnTop={false} draggable className='select-none' />
          <Suspense fallback={<PageSuspense />}>
            <SetupAccountStoreProvider>
              {children}
            </SetupAccountStoreProvider>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
