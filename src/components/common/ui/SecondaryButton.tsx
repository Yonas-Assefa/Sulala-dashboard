"use client";
import { openModal } from "@/lib/modals";
import { Link } from "@/i18n/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  href?: string;
  modal?: string;
  handleClick?: () => void;
  name: string;
  padding?: "xsm" | "sm" | "md" | "lg" | "xlg";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  isPending?: boolean;
};

function SecondaryButton({
  href,
  name,
  padding,
  modal,
  type,
  handleClick,
  disabled,
  isPending,
}: Props) {
  const paddings = {
    xsm: "px-[10px]",
    sm: "px-[30px]",
    md: "px-[100px]",
    lg: "px-[200px]",
    xlg: "px-[300px]",
  };

  const { pending } = useFormStatus();

  const handleButtonClick = () => {
    if (disabled) return;
    if (handleClick) {
      handleClick();
    }
    if (modal) {
      openModal(modal);
    }
  };
  const props = {};

  if (handleButtonClick) {
    Object.assign(props, { onClick: handleButtonClick });
  }
  if (type) {
    Object.assign(props, { type });
  }

  if (href) {
    return (
      <Link
        href={disabled ? "" : (href as any)}
        className={`btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-secondary/40 border-0 text-black ${padding && paddings[padding]} ${(disabled || pending) && "bg-secondary hover:bg-secondary border-0 text-white cursor-not-allowed"}`}
      >
        {pending || isPending ? (
          <span className="loading loading-spinner loading-md text-primary"></span>
        ) : (
          name
        )}
      </Link>
    );
  } else {
    return (
      <button
        className={`btn w-full rounded-[40px] bg-[#f6f6f6] hover:bg-secondary/40 border-0 text-black ${padding && paddings[padding]} ${(disabled || pending) && "bg-secondary hover:bg-secondary border-0 text-white cursor-not-allowed"}`}
        {...props}
      >
        {pending || isPending ? (
          <span className="loading loading-spinner loading-md text-primary"></span>
        ) : (
          name
        )}
      </button>
    );
  }
}

export default SecondaryButton;
