import { FRONTEND_BASE_URL } from "@/config/urls";

export const metadata = {
    metadataBase: new URL(FRONTEND_BASE_URL).origin,
    alternates: {
        canonical: '/',
        languages: {
            'en': '/en',
            'ar': '/ar',
        },
    },
    openGraph: {
        images: '/sulala-logo.svg',
    },
}

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}