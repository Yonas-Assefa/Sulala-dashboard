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
