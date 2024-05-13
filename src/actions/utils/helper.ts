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
    const cookieString = response.headers.get('set-cookie') || '';
    const accessToken = RegExp(/(?<=access=).+?(?=;)/).exec(cookieString)?.[0]
    const refreshToken = RegExp(/(?<=refresh=).+?(?=;)/).exec(cookieString)?.[0]
    const csrfToken = RegExp(/(?<=csrftoken=).+?(?=;)/).exec(cookieString)?.[0]
    cookies().set({
        name: 'access',
        value: accessToken || '',
        httpOnly: true,
        path: '/',
    })
    cookies().set({
        name: 'refresh',
        value: refreshToken || '',
        httpOnly: true,
        path: '/',
    })
    cookies().set({
        name: 'csrftoken',
        value: csrfToken || '',
        httpOnly: true,
        path: '/',
    })
    // cookies().set('set-cookie', cookieString)
}

export const getBrowserCookie = () => {
    return cookies().getAll().toSorted() || ''
}