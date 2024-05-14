import { TCreatePassword, TSignin, TSignup, TVerifyEmail, TVerifyPhone } from "@/types/api-service.type";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const VENDOR_URL = `${BASE_URL}vendors/`;


export const signup = (data: TSignup) => {
    console.log({ message: 'sign up is called' })
    return fetch(`${VENDOR_URL}register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}


export const signin = ({ by, ...data }: TSignin) => {
    const url_endpoint = by == 'email' ? 'login-with-email/' : 'login-with-phonenumber/'
    return fetch(`${VENDOR_URL}${url_endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}


export const verifyEmail = ({ confirmation_token, vendor_id }: TVerifyEmail) => {
    return fetch(`${VENDOR_URL}verify-email/?confirmation_token=${confirmation_token}&vendor_id=${vendor_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}


export const verifyPhone = ({ action, ...data }: TVerifyPhone) => {
    const url_endpoint = action == 'signup' ? 'verify-phonenumber/' : 'confirm_phonenumber_login/'
    const method = action == 'signup' ? 'PATCH' : 'POST'
    return fetch(`${VENDOR_URL}${url_endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}


export const createPassword = (data: TCreatePassword) => {
    return fetch(`${VENDOR_URL}set-password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}