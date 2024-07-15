import React from "react";
import { Link } from "@/i18n/navigation";

async function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="bg-white flex-grow">
        <div className="w-full h-full flex justify-between flex-col items-center">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-2xl md:text-4xl font-semibold text-primary">
              404 - Page Not Found
            </h1>
            <div className="flex flex-row justify-between gap-5">
              <Link
                href={"/dashboard/settings"}
                className="text-primary font-semibold hover:underline"
              >
                Redirect to dashboard?
              </Link>
            </div>
            <img
              src="/sulala-logo.svg"
              className="w-[100px] opacity-15 absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
