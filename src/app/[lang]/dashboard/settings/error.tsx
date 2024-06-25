"use client";
import React from "react";
import ErrorDisplay from "@/app/[lang]/components/ErrorDisplay";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
function error({ reset }: ErrorProps) {
  return (
    <div className="w-screen h-screen">
      <ErrorDisplay title="Settings" reset={reset} />
    </div>
  );
}

export default error;
