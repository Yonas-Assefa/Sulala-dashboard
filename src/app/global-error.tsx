"use client";
// @ts-nocheck

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

// @ts-ignore
export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* @ts-ignore */}
        <Error />
        "Global Error Page"
      </body>
    </html>
  );
}
