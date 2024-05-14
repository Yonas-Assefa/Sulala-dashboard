import { getPhoneNumber } from "@/utils/helper";
import { createPasswordSchema, emailSignInSchema, emailSignUpSchema, otpVerificationSchema, phoneAuthSchema, verifyEmailSchema } from "../schema/zod-schema";

export const validateSignup = (formData: FormData) => {
    const data: { phone_number?: string, email?: string } = {}

    const by = formData.get('by')?.toString()

    if (by == 'email') {
        const ZodObj = emailSignUpSchema.parse({
            email: formData.get('email'),
        });
        return { ...ZodObj }
    } else {
        const ZodObj = phoneAuthSchema.parse({
            phone_number: getPhoneNumber({
                phone_number: formData.get('phone_number'),
                country_code: formData.get('country_code')
            }),
        });
        return { ...ZodObj }
    }
}

export const validateSignin = (formData: FormData) => {
    const by = formData.get('by')?.toString()

    if (by == 'email') {
        const ZodObj = emailSignInSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        });
        return { ...ZodObj }
    } else {
        const ZodObj = phoneAuthSchema.parse({
            phone_number: getPhoneNumber({ phone_number: formData.get('phone_number'), country_code: formData.get('country_code') })
        });
        return { ...ZodObj }
    }
}

export const validateOtp = (formData: FormData) => {
    const data = otpVerificationSchema.parse({
        phone_number: formData.get('phone_number'),
        otp: formData.get('otp')?.toString(),
    })
    return data
}

export const validateCreatePassword = (formData: FormData) => {
    const data = createPasswordSchema.parse({
        password: formData.get('password'),
        confirm_password: formData.get('password_confirm'),
    });
    return data
}

export const validateVerifyEmail = (formData: FormData) => {
    const data = verifyEmailSchema.parse({
        confirmation_token: formData.get('confirmation_token'),
        vendor_id: formData.get('vendor_id')
    })
    return data
}