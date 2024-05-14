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

    cookies().set({
        name: 'all_cookies',
        value: cookieString,
    })
}

export const getBrowserCookie = () => {
    const cookieArray = cookies().getAll()
    return cookieArray.filter((cookie) => cookie.name !== 'all_cookies').map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
}

export const getBearerToken = () => {
    const token = 'Bearer ' + cookies().get('access')?.value || ''
    return token
}

export const getRequestHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Cookie': getBrowserCookie(),
        'Authorization': getBearerToken(),
    }
}