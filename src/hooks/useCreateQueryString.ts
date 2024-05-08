import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
            router.push(pathname + queryParam);
        },
        [searchParams]
    );


    return { createQueryString, searchParams, createQueryStringAndPush };
}