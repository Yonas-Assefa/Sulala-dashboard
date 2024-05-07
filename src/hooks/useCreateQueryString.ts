import { useSearchParams } from "next/navigation";
import React from "react";

export const useCreateQueryString = () => {
    type KeyValue = { key: string; value: string };
    const searchParams = useSearchParams();

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

    return { createQueryString, searchParams };
}