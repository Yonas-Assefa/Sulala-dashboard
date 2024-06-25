"use client";
import { openModal } from "@/lib/modals";
import { Link } from "@/i18n/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

type Props = {
  handleClick?: () => void;
  href?: string;
  modal?: string;
  padding?: "xsm" | "sm" | "md" | "lg" | "xlg";
  name?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  ref?: React.RefObject<HTMLButtonElement>;
  className?: string;
  isPending?: boolean;
};

const paddings = {
  xsm: "px-[50px]",
  sm: "px-[80px]",
  md: "px-[100px]",
  lg: "px-[200px]",
  xlg: "px-[300px]",
};

function PrimaryButton({
  padding,
  name,
  handleClick,
  className,
  modal,
  ref,
  href,
  type,
  disabled = false,
  isPending,
}: Props) {
  const { pending } = useFormStatus();
  const t = useTranslations("Commons");

  const handleButtonClick = (e: React.MouseEvent) => {
    if (disabled) e.preventDefault();
    if (handleClick) {
      handleClick();
    }
    if (modal) {
      openModal(modal);
    }
  };

  const props = {};
  if (handleButtonClick && type !== "submit") {
    Object.assign(props, { onClick: handleButtonClick });
  }
  if (type) {
    Object.assign(props, { type });
  }
  if (ref) {
    Object.assign(props, { ref });
  }

  if (href) {
    return (
      <Link
        href={href as any}
        className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary dark:bg-primary/80  hover:bg-primary/80 ${padding && paddings[padding]} ${(disabled || pending) && "bg-secondary hover:bg-secondary border-0 text-white cursor-not-allowed"}`}
        onClick={handleButtonClick}
      >
        {pending || isPending ? (
          <span className="loading loading-spinner loading-md text-primary"></span>
        ) : (
          name || t("continue")
        )}
      </Link>
    );
  } else
    return (
      <button
        className={`btn rounded-[40px] disabled:bg-secondary border-0 disabled:text-white disabled:cursor-not-allowed text-white bg-primary dark:bg-primary/80 hover:bg-primary/80 ${padding && paddings[padding]} ${className}`}
        disabled={disabled || pending || isPending}
        {...props}
      >
        {pending || isPending ? (
          <span className="loading loading-spinner loading-md text-primary"></span>
        ) : (
          name || t("continue")
        )}
      </button>
    );
}

export default PrimaryButton;
