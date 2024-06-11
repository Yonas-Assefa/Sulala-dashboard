import { FormState } from "@/utils/formStateHelper";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useRef } from "react";

export const useRedirectRoute = (formState: FormState) => {
    const router = useRouter();
    const pathname = usePathname();
    const prevTimestamp = useRef(formState.timestamp);

    const doRedirect =
        formState.redirectUrl &&
        formState.timestamp !== prevTimestamp.current &&
        pathname !== formState.redirectUrl;

    useEffect(() => {
        if (doRedirect) {
            router.push(formState.redirectUrl as any);
        }
    }, [formState, doRedirect]);
}