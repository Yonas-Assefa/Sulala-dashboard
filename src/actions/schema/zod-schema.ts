import { z } from 'zod';
import { confirmPasswordRefine, phoneTransform } from '../utils/helper';

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

export const resendOtpSchema = z.object({
    phone_number: z.string().transform(phoneTransform),
})

export const createPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm_password: z.string().min(6, 'Password must be at least 6 characters long')
}).refine(confirmPasswordRefine.Fn, confirmPasswordRefine.Opt);

export const verifyEmailSchema = z.object({
    confirmation_token: z.string({ message: 'Invalid url' }),
    vendor_id: z.string({ message: 'Invalid url' }),
})

export const setupAccountFirstStepSchema = z.object({
    first_name: z.string().min(2, 'First name must be at least 2 characters long'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters long'),
    email: z.string().email(),
})

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    ".pdf", "application/pdf"
];

export const setupAccountLastStepSchema = z.object({
    name: z.string().min(1, 'Company name must be at least 1 character long'),
    legal_address: z.string().min(1, 'Address must be at least 1 character long'),
    category: z.number().min(1, 'Please choose at least one category'),
    certificates: z.any()
        .refine((file) => {
            console.log({ file })
            if (file.size === 0 || file.name === undefined) return false;
            else return true;
        }, "Please update or add new image.")

        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "only pdf files are accepted."
        ),
    // .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),

    tax_forms: z.any()
        .refine((file) => {
            console.log({ file })
            if (file.size === 0 || file.name === undefined) return false;
            else return true;
        }, "Please update or add new image.")

        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "only pdf files are accepted."
        )
    // .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
})

// export const setupAccountThreeSchema = z.object({
//     phone_number: z.string().transform(phoneTransform),
// })