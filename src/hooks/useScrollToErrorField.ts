import { useEffect, useRef } from "react";

const useScrollToErrorField = <T extends HTMLElement>(
  error: string | undefined,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current && error) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [error]);

  return ref;
};

export { useScrollToErrorField };
