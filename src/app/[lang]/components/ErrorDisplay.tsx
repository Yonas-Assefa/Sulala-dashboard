"use client";
import React from "react";
type ErrorProps = {
  reset?: () => void;
  title?: string;
};
function ErrorDisplay({ reset, title }: ErrorProps) {
  const handleRetry = () => {
    const errorStatus = localStorage.getItem("NEXT_ERR");

    if (reset && errorStatus !== "SOFT_RELOAD") {
      localStorage.setItem("NEXT_ERR", "SOFT_RELOAD");
      reset();
    } else {
      localStorage.setItem("NEXT_ERR", "HARD_RELOAD");
      window.location.reload();
    }
  };
  return (
    <div className="w-full h-full flex flex-row bg-gradient-to-br from-black/5 to-black/25 dark:from-gray-700 dark:to-gray-800">
      <div className="bg-transparent flex-grow">
        <div className="w-full h-full flex justify-between flex-col items-center">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img src="/icons/alert.svg" alt="" className="opacity-80" />
            <h1 className="text-sm md:text-md text-center font-semibold text-danger">
              Error while loading {title || "contents"}!
            </h1>
            <p className="text-sm md:text-md text-center font-normal text-gray-800 dark:text-white">
              This error is already tracked by our system.
              <br />
              If you keep getting this error, please contact
              <br />
              &nbsp;
              <a
                href="mailto:support@sulala.com"
                className="font-semibold text-primary"
              >
                contact team!
              </a>
            </p>
            <div className="flex flex-col justify-between gap-5">
              {/* <a href='mailto:support@sulala.com' className='text-primary font-semibold hover:underline'>Please contact support team!</a> */}
              <button
                onClick={handleRetry}
                className="flex flex-row gap-3 px-2 group bg-tertiary/50 dark:bg-gray-900 hover:bg-tertiary/90  dark:hover:bg-gray-700 cursor-pointer z-20 p-1 rounded-[30px] items-center justify-center"
              >
                <p className="text-black dark:text-white text-sm md:text-md">
                  retry
                </p>
                <img
                  src="/icons/retry.svg"
                  alt=""
                  className="w-[10px] aspect-square group-[:hover]:animate-spin"
                />
              </button>
            </div>
            <img
              src="/icons/whatshot.svg"
              className="w-[100px] opacity-15 absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;
