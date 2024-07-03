"use client";
import { useRouter } from "@/i18n/navigation";
import React from "react";

function BackButton({ handleClick }: { handleClick?: () => void }) {
  const router = useRouter();
  const handleBackClick = () => {
    if (handleClick) {
      handleClick();
    } else {
      router.back();
    }
  };
  return (
    <div className="flex w-full mb-4">
      <button
        className="bg-tertiary dark:bg-gray-600 hover:bg-primary/20 p-2 rounded-full btn border-0"
        onClick={handleBackClick}
      >
        <img src="/icons/arrow-left.svg" alt="" className="w-[30px]" />
      </button>
    </div>
  );
}

export default BackButton;
