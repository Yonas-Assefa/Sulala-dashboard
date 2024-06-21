"use client";
import React from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
function error({ error, reset }: ErrorProps) {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="bg-white flex-grow">
        <div className="w-full h-full flex justify-between flex-col items-center">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <img src="/icons/alert.svg" alt="" className="opacity-80" />
            <h1 className="text-2xl md:text-4xl text-center  font-semibold text-danger">
              Error - While loading orders
            </h1>
            <div className="flex flex-col justify-between gap-5">
              <a
                href="mailto:support@sulala.com"
                className="text-primary font-semibold hover:underline"
              >
                Please contact support team!
              </a>
              <button
                onClick={reset}
                className="flex flex-row gap-3 items-center justify-center"
              >
                <p className="text-black">retry</p>
                <img
                  src="/icons/retry.svg"
                  alt=""
                  className="w-[15px] aspect-square"
                />
              </button>
            </div>
            <img
              src="/icons/shopping_bag.svg"
              className="w-[100px] opacity-15 absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default error;
