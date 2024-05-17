import { cookies } from "next/headers";
import parsePhoneNumberFromString from 'libphonenumber-js';
import { z } from 'zod';

export const phoneTransform = (arg: string, ctx: z.RefinementCtx) => {
    const phone = parsePhoneNumberFromString(arg, {
        // DEFAULT ETHIOPIA
        defaultCountry: 'ET',
        extract: false,
    });

    if (phone && phone.isValid()) {
        return phone.number;
    }
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
    });
    return z.NEVER;
}

export const confirmPasswordRefine = {
    Fn: (values: any) => {
        return values.password === values.confirm_password;
    },
    Opt: {
        message: "Passwords must match!",
        path: ["confirm_password"],
    }
}

const MAX_FILE_SIZE = 5000000;
const PDF_TYPES = [
    ".pdf", "application/pdf"
];
const IMAGE_TYPES = [
    ".jpg", ".jpeg", ".png", "image/*", "image/jpeg", "image/png"
];


export const fileRefine = {
    existFn: (file: any) => {
        if (file.size === 0 || file.name === undefined) return false;
        else return true;
    },
    existMg: "Please update or add new file.",
    acceptFn: (file: any) => PDF_TYPES.includes(file?.type),
    acceptMg: "only pdf files are accepted.",
    maxsizeFn: (file: any) => file.size <= MAX_FILE_SIZE,
    maxsizeMg: `Max file size is 5MB.`
}

export const imageRefine = {
    existFn: (file: any) => {
        if (file.size === 0 || file.name === undefined) return false;
        else return true;
    },
    existMg: "Please update or add new file.",
    acceptFn: (file: any) => {
        return IMAGE_TYPES.includes(file?.type)
    },
    acceptMg: "only images files are accepted.",
    maxsizeFn: (file: any) => file.size <= MAX_FILE_SIZE,
    maxsizeMg: `Max file size is 5MB.`
}

export const isFiniteNumber = (value: unknown): value is number => {
    return typeof value === 'number' && isFinite(value);
};

export const transformToNumber = (value: string): number => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : Math.floor(parsedValue)
};

type TGetPhoneNumber = {
    phone_number: FormDataEntryValue | string | null;
    country_code: FormDataEntryValue | string | null;
}
export const getPhoneNumber = ({ phone_number: raw_phone_number, country_code: raw_country_code }: TGetPhoneNumber) => {
    if (!raw_phone_number && !raw_country_code) return ''

    const phone_number = !raw_phone_number ? '' : (
        raw_phone_number?.toString()?.[0] == '0' ? raw_phone_number.slice(1) : raw_phone_number
    )
    const country_code = !raw_country_code ? '' : (
        raw_country_code?.toString()?.[0] == '+' ? raw_country_code : `+${raw_country_code}`
    )
    return `${country_code}${phone_number}`
}

export type TRequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const makeRequest = async (url: string, data: object, method: TRequestMethod) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: method === 'GET' ? undefined : JSON.stringify(data),
    })
    return response
}

export const makeRequestWithCookie = async (url: string, data: object, method: TRequestMethod, cookie: string) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie,
        },
        body: method === 'GET' ? undefined : JSON.stringify(data),
    })
    return response
}

export const setBrowserCookie = (response: Response) => {
    const cookieArray = response.headers.getSetCookie() || [];
    const cookieString = response.headers.get('Set-Cookie') || '';
    // const accessTokenArray = cookieString.find((cookie: string) => cookie.includes('access='))?.split('; ')
    for (const cookie of cookieArray) {
        const cookieProps = cookie.split('; ')
        const [key, value] = cookieProps[0].split('=')
        const httpOnly = cookieProps.find((prop) => prop.includes('HttpOnly'))
        const path = cookieProps.find((prop) => prop.includes('Path'))?.split('=')[1]
        const expires = cookieProps.find((prop) => prop.includes('expires'))?.split('=')[1]
        const samesite = cookieProps.find((prop) => prop.includes('SameSite'))?.split('=')[1]

        cookies().set({
            name: key,
            value: value,
            httpOnly: !!httpOnly,
            path: path,
            expires: new Date(expires || ''),
        })
    }
}

export const getBrowserCookie = () => {
    const cookieArray = cookies().getAll()
    return cookieArray.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
}

export const getBearerToken = () => {
    const token = 'Bearer ' + cookies().get('access')?.value || ''
    return token
}

export const getRequestHeaders = () => {
    return {
        'Authorization': getBearerToken(),
        'Content-Type': 'application/json',
    }
}

export const getMultiPartRequestHeaders = () => {
    return {
        'Authorization': getBearerToken(),
    }
}

export const isAuthenticated = () => {
    return !!cookies().get('access')?.value
}

export const changeObjToFormData = (Obj: object) => {
    return Object.entries(Obj).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((val) => {
                acc.append(key, val)
            })
            return acc
        }
        acc.append(key, value)
        return acc
    }, new FormData())
}

export const getResponseErrorMessage = (body: any, defaultMessage?: string): string => {
    if (body.message) {
        if (typeof body.message === 'object') return body.message[Object.keys(body.message)[0]] || defaultMessage || 'Failed to submit form'
        return body.message
    }
    if (body[Object.keys(body)[0]]) {
        if (typeof body[Object.keys(body)[0]] === 'string') return defaultMessage || 'Failed to submit form'
        return body[Object.keys(body)[0]][0] || defaultMessage || 'Failed to submit form'
    }
    return defaultMessage || 'Failed to submit form'
}