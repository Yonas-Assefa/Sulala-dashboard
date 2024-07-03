"use client";
import { Console } from "@/lib/print";
// @ts-nocheck

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect, useState } from "react";

// @ts-ignore
export default function GlobalError({ error }) {
  const [isCaptured, setIsCaptured] = useState(false);

  useEffect(() => {
    try {
      Sentry.captureException(error);
      setIsCaptured(true);
    } catch (e) {
      Console.error(e);
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
