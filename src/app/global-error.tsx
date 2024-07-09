"use client";
import { Console } from "@/lib/print";
// @ts-nocheck

import Error from "next/error";
import { useEffect, useState } from "react";

const USE_SENTRY = process.env.NEXT_PUBLIC_USE_MONITORING === "true";
// @ts-ignore
export default function GlobalError({ error }) {
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    if (USE_SENTRY && error) {
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error);
        setIsCaptured(true);
      });
    } else {
      Console.error("Error is not captured by Sentry!");
      setIsCaptured(false);
    }
  }, [error]);

  return (
    <html>
      <body>
        {/* @ts-ignore */}
        <Error />
        "Global Error Page"
        <div>
          {isCaptured ? (
            <p>Error is tracked by our system!</p>
          ) : (
            <p>
              Please report this error.
              <span>ERR_CODE: ${error?.digest}</span>
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
