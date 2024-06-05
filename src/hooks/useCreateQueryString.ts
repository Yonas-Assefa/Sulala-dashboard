import { usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";

export const useCreateQueryString = () => {
    type KeyValue = { key: string; value: string };
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname()

    const createQueryString = React.useCallback(
        (nameOrParams: string | KeyValue[], value?: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (Array.isArray(nameOrParams)) {
                nameOrParams.forEach(({ key, value }) => {
                    params.set(key, value);
                });
            } else if (typeof nameOrParams === 'string' && value !== undefined) {
                params.set(nameOrParams, value);
            } else {
                throw new Error('Invalid arguments. Either provide a key-value pair or an array of objects with key-value pairs.');
            }

            return '?' + params.toString();
        },
        [searchParams]
    );

    const createQueryStringAndPush = React.useCallback(
        (nameOrParams: string | KeyValue[], value?: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (Array.isArray(nameOrParams)) {
                nameOrParams.forEach(({ key, value }) => {
                    params.set(key, value);
                });
            } else if (typeof nameOrParams === 'string' && value !== undefined) {
                params.set(nameOrParams, value);
            } else {
                throw new Error('Invalid arguments. Either provide a key-value pair or an array of objects with key-value pairs.');
            }

            const queryParam = '?' + params.toString();
            router.push(pathname + queryParam as any);
        },
        [searchParams]
    );

    const deleteQueryString = React.useCallback(
        (nameOrParams: string | string[]) => {
            const params = new URLSearchParams(searchParams.toString());

            if (Array.isArray(nameOrParams)) {
                nameOrParams.forEach((key) => {
                    params.delete(key);
                });
            } else if (typeof nameOrParams === 'string') {
                params.delete(nameOrParams);
            } else {
                throw new Error('Invalid arguments. Either provide a key or an array of keys.');
            }

            return '?' + params.toString();
        },
        [searchParams]
    );

    const deleteQueryStringAndPush = React.useCallback(
        (nameOrParams: string | string[]) => {
            const params = new URLSearchParams(searchParams.toString());

            if (Array.isArray(nameOrParams)) {
                nameOrParams.forEach((key) => {
                    params.delete(key);
                });
            } else if (typeof nameOrParams === 'string') {
                params.delete(nameOrParams);
            } else {
                throw new Error('Invalid arguments. Either provide a key or an array of keys.');
            }

            const queryParam = '?' + params.toString();
            router.push(pathname + queryParam as any);
        },
        [searchParams]
    );


    return { createQueryString, searchParams, createQueryStringAndPush, deleteQueryString, deleteQueryStringAndPush };
}