import { FormState } from "@/utils/formStateHelper";
import { usePathname, useRouter } from "@/i18n/navigation";
import React from "react";

export const useRedirectRoute = (formState: FormState) => {
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        if (
            ["SUCCESS", "INFO", "ERROR"].includes(formState.status) &&
            formState.redirectUrl &&
            pathname !== formState.redirectUrl) {
            router.push(formState.redirectUrl);
        }
    }, [formState.redirectUrl]);
}