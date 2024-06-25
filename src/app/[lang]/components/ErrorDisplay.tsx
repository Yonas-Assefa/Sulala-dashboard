"use client";
import React from "react";
type ErrorProps = {
  reset: () => void;
  title?: string;
};
function ErrorDisplay({ reset, title }: ErrorProps) {
  return (
    <div className="w-full h-full flex flex-row bg-gradient-to-br from-black/5 to-black/25">
      <div className="bg-transparent flex-grow">
        <div className="w-full h-full flex justify-between flex-col items-center">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img src="/icons/alert.svg" alt="" className="opacity-80" />
            <h1 className="text-sm md:text-md text-center font-semibold text-danger">
              Error while loading {title || "contents"}!
            </h1>
            <p className="text-sm md:text-md text-center font-normal text-gray-800">
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
                onClick={reset}
                className="flex flex-row gap-3 px-2 group bg-tertiary/50 hover:bg-tertiary/90 cursor-pointer z-20 p-1 rounded-[30px] items-center justify-center"
              >
                <p className="text-black text-sm md:text-md">retry</p>
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
