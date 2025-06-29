import BackButton from "@/components/common/ui/BackButton";
import { Link, redirect } from "@/i18n/navigation";
import React from "react";
import QRCode from "react-qr-code";

type Props = {
  searchParams: {
    store: string | undefined;
  };
};

const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.sulala.app";
const APPSTORE_URL = "https://apps.apple.com/us/app/sulala/id1577755942";

function DownloadApp({ searchParams: { store } }: Props) {
  if (!store || (store !== "appstore" && store !== "playstore")) {
    redirect("/auth/download-app?store=appstore");
  }

  const QR_CODE_URL = store == "appstore" ? APPSTORE_URL : PLAYSTORE_URL;

  return (
    <div className="w-11/12 md:w-9/12 flex flex-col gap-6 items-center justify-center ">
      <BackButton />
      {/* SIGN IN HEADER */}
      <h1 className="text-2xl md:text-[30px] font-serif font-semibold text-primary">
        {store == "appstore"
          ? "Download from App Store"
          : "Download from Play Store"}
      </h1>

      <div className="flex flex-col justify-center">
        <p className="text-center">
          Download our app from App Store or Play Store by scanning the QR code
          below with your phone.
        </p>
        <div className="flex flex-row justify-center items-center py-6 bg-white">
          <QRCode
            value={QR_CODE_URL}
            size={200}
            bgColor="#ffffff"
            fgColor="#176635"
          />
          {/* <img src="/sulala-logo.svg" alt="" className='absolute top-[75px] right-[85px] bg-white  w-[50px]' /> */}
        </div>
      </div>

      {/* <Link
        href={
          store == "playstore"
            ? "/auth/download-app?store=appstore"
            : "/auth/download-app?store=playstore"
        }
        className="underline text-primary cursor-pointer"
      >
        {store == "appstore"
          ? "Download from Play Store"
          : "Download from App Store"}
      </Link>       */}
      <Link
        href={
          store == "playstore"
            ? "/auth/download-app?store=appstore"
            : "/auth/download-app?store=playstore"
        }
        className="flex flex-row justify-center gap-1 p-[2px] bg-tertiary rounded-[30px] transition-all"
      >
        <div
          className={` py-1 px-2 rounded-[30px] ${store == "playstore" ? "bg-primary" : "bg-transparent"}`}
        >
          <img
            src="/icons/playstore.webp"
            alt="playstore"
            className="w-[15px] aspect-square"
          />
        </div>
        <div
          className={` py-1 px-2 rounded-[30px] ${store == "appstore" ? "bg-primary" : "bg-transparent"}`}
        >
          <img
            src="/icons/appstore.png"
            alt="appstore"
            className="w-[15px] aspect-square"
          />
        </div>
      </Link>
      <div>
        <p className="text-sm text-secondary">Couldn't scan the code? </p>
        <a
          href={QR_CODE_URL}
          className="underline text-primary cursor-pointer flex justify-center gap-2"
        >
          Download using link{" "}
          <img
            src="/icons/external-link.svg"
            alt=""
            className="w-[15px] aspect-square"
          />
        </a>
      </div>
    </div>
  );
}

export default DownloadApp;
