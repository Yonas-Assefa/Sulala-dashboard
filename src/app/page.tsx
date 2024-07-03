import { DEFAULT_LOCALE } from "@/i18n/config";
import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect(`/${DEFAULT_LOCALE}`);
  return (
    <html>
      <body></body>
    </html>
  );
}

export default page;
