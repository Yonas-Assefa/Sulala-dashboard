import { FormState } from "@/utils/formStateHelper";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const useRedirectRoute = (formState: FormState) => {
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        console.log('trying to redirect')
        if (
            ["SUCCESS", "INFO"].includes(formState.status) &&
            formState.redirectUrl &&
            pathname !== formState.redirectUrl) {
            router.push(formState.redirectUrl);
        }
    }, [formState.redirectUrl]);
}