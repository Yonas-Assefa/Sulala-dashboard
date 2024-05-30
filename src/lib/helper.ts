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

export const MAX_FILE_SIZE = 5000000;
export const PDF_TYPES = [
    ".pdf", "application/pdf"
];
export const IMAGE_TYPES = [
    ".jpg", ".jpeg", ".png", "image/*", "image/jpeg", "image/png"
];


export const fileRefine = {
    existFn: (file: any) => {
        if (file.size === 0 || file.name === undefined) return false;
        else return true;
    },
    existMg: "Please update or add new file.",
    acceptFn: (accept: string[]) => (file: any) => accept.includes(file?.type),
    acceptMg: (acceptType: string) => `only ${acceptType} files are accepted.`,
    maxsizeFn: (maxSize: number) => (file: any) => file.size <= maxSize,
    maxsizeMg: (maxSize: number) => `Max file size is ${maxSize}MB.`
}

function luhnCheck(cardNumber: string) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

export const cardNumberRefine = {
    Fn: (val: string) => {
        const sanitized = val.replace(/\D/g, '');

        if (sanitized.length < 13 || sanitized.length > 19) {
            return false;
        }

        if (!luhnCheck(sanitized)) {
            return false;
        }

        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/; // Visa: Starts with 4
        const mastercardRegex = /^5[1-5][0-9]{14}$/; // Mastercard: Starts with 51-55

        return visaRegex.test(sanitized) || mastercardRegex.test(sanitized);
    },
    Opt: {
        message: 'Invalid card number. Must be a valid Visa or Mastercard number.',
    }
}

export const removeNullAndUndefined = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => {
            if (Array.isArray(v)) {
                return v.length > 0
            }
            if (v instanceof File) {
                return v.size > 0
            }
            return v !== null && v !== undefined
        })
    );
};

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
    console.log({ cookieArray })
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


export const clearBrowserCookie = () => {
    const cookieArray = cookies().getAll()
    cookieArray.forEach((cookie) => {
        cookies().delete(cookie.name)
    })
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

export const formatCategory = (categories: any[]) => {
    return categories.map((category: any) => {
        const data = {
            label: category.name,
            value: category.id
        }
        if (category.subcategories) {
            const options = category.subcategories.map((subcategory: any) => ({
                label: subcategory.name,
                value: subcategory.id
            }))
            Object.assign(data, { options })
        }
        return data
    })
}

export const buildUrlWithParams = (url: string, params = {}) => {
    const queryString = Object.entries(params)
        .filter(([_, value]) => !['undefined', 'null', undefined, null, ''].includes(value?.toString()?.toLowerCase() as string))
        .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
        .join('&');
    if (!queryString) {
        return url;
    }
    return `${url}?${queryString}`;
};

type TFetch = {
    url: string,
    method: TRequestMethod,
    data?: object,
    headers?: object,
    params?: object,
    cache?: RequestCache,
    next?: {
        tags: string[]
    }
}
export const Fetch = async (args: TFetch) => {
    const { url, method, data, headers, params, cache, next } = args
    const requestUrl = params ? buildUrlWithParams(url, params) : url

    const options = {}

    if (method) {
        Object.assign(options, { method })
    }

    if (headers) {
        Object.assign(options, { headers })
    }

    if (data) {
        Object.assign(options, { body: method === 'GET' ? undefined : JSON.stringify(data) })
    }

    if (cache) {
        Object.assign(options, { cache })
    }

    if (next) {
        Object.assign(options, { next })
    }

    const response = await fetch(requestUrl, {
        ...options,
    })
    return response
}