import { z } from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';

const phoneTransform = (arg: string, ctx: z.RefinementCtx) => {
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

export const phoneAuthSchema = z.object({
    phone_number: z.string().transform(phoneTransform)
});

export const emailSignUpSchema = z.object({
    email: z.string().email(),
});

export const emailSignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const otpVerificationSchema = z.object({
    phone_number: z.string().transform(phoneTransform),
    otp: z.string().length(6, 'OTP must be a six digit number').regex(/^\d+$/, 'OTP must be a 6 digit number'),
})
