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

export const createPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm_password: z.string().min(6, 'Password must be at least 6 characters long')
}).refine(confirmPasswordRefine.Fn, confirmPasswordRefine.Opt);

export const verifyEmailSchema = z.object({
    confirmation_token: z.string({ message: 'Invalid url' }),
    vendor_id: z.string({ message: 'Invalid url' }),
})

export const setupAccountOneSchema = z.object({
    first_name: z.string().min(2, 'First name must be at least 2 characters long'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters long'),
    email: z.string().email(),
})

export const setupAccountTwoSchema = z.object({
    company_name: z.string(),
    address: z.string(),
    sale_category: z.string(),
})

// export const setupAccountThreeSchema = z.object({
//     phone_number: z.string().transform(phoneTransform),
// })