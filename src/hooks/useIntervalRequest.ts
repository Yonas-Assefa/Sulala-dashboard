import { useRouter } from "@/i18n/navigation";
import React from "react";
import { pushSuccessNotification } from "@/utils/pushNotification.util";
import { getPersonalInfo } from "@/actions/settings/get-personal-info";

export const useIntervalRequest = ({ time = 5, redirect, message, property }: { message: string, time?: number, redirect: string, property: string }) => {
    const router = useRouter();
    const checkFn = async () => {
        const personalInfo = await getPersonalInfo()
        if (personalInfo?.[property]) {
            pushSuccessNotification(message)
            router.push(redirect as any)
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            checkFn()
        }, time * 1000)
        return () => clearInterval(interval)
    }, [])
}