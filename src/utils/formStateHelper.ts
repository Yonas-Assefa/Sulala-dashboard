import { ZodError } from 'zod';

export type FormState = {
    status: 'UNSET' | 'SUCCESS' | 'ERROR';
    message: string;
    fieldErrors: Record<string, string[] | undefined>;
    timestamp: number;
    redirectUrl?: string;
};

export const EMPTY_FORM_STATE: FormState = {
    status: 'UNSET' as const,
    message: '',
    fieldErrors: {},
    timestamp: Date.now(),
    redirectUrl: undefined
};

export const fromErrorToFormState = (error: unknown, redirectUrl?: string) => {
    console.log({ redirectUrl })
    if (error instanceof ZodError) {
        return {
            status: 'ERROR' as const,
            message: error.errors[0].message,
            fieldErrors: error.flatten().fieldErrors,
            timestamp: Date.now(),
            redirectUrl: redirectUrl
        };
    } else if (error instanceof Error) {
        return {
            status: 'ERROR' as const,
            message: error.message,
            fieldErrors: {},
            timestamp: Date.now(),
            redirectUrl: redirectUrl
        };
    } else {
        return {
            status: 'ERROR' as const,
            message: 'An unknown error occurred',
            fieldErrors: {},
            timestamp: Date.now(),
            redirectUrl: redirectUrl
        };
    }
};

export const toFormState = (
    status: FormState['status'],
    message: string,
    redirectUrl?: string
): FormState => {
    return {
        status,
        message,
        fieldErrors: {},
        timestamp: Date.now(),
        redirectUrl,
    };
};