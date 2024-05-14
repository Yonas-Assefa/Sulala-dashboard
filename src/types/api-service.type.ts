export type TSignup = {
    email?: string
    phone_number?: string
}

export type TSignin = {
    email?: string
    password?: string
    phone_number?: string
    by?: string
}


export type TVerifyEmail = {
    confirmation_token: string
    vendor_id: string
}


export type TVerifyPhone = {
    phone_number: string
    otp: string
    action?: string
}

export type TCreatePassword = {
    password: string
    confirm_password: string
}