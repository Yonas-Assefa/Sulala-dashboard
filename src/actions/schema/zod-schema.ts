import { z } from 'zod';
import { confirmPasswordRefine, fileRefine, imageRefine, isFiniteNumber, phoneTransform, transformToNumber } from '../utils/helper';

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
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string().min(8, 'Password must be at least 8 characters long')
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

export const setupAccountLastStepSchema = z.object({
    name: z.string().min(1, 'Company name must be at least 1 character long'),
    legal_address: z.string().min(1, 'Address must be at least 1 character long'),
    category: z.number().min(1, 'Please choose at least one category'),
    certificates: z.any()
        .refine(fileRefine.existFn, fileRefine.existMg)
        .refine(fileRefine.acceptFn, fileRefine.acceptMg),
    // .refine(fileRefine.maxsizeFn, fileRefine.maxsizeMg),

    tax_forms: z.any()
        .refine(fileRefine.existFn, fileRefine.existMg)
        .refine(fileRefine.acceptFn, fileRefine.acceptMg),
    // .refine(fileRefine.maxsizeFn, fileRefine.maxsizeMg),
})

// ("NEW", "New"),
// ("ACTIVE", "Active"),
// ("DRAFT", "Draft"),
// ("ARCHIVED", "Archived"),
enum ProductStatus {
    NEW = 'New',
    ACTIVE = 'Active',
    DRAFT = 'Draft',
    ARCHIVED = 'Archived',
}
export const createProductSchema = z.object({
    title: z.string({ message: 'Product title is a required field' }).min(1, { message: 'Product name must be at least 1 character long' }),
    description: z.string().min(1, 'Description must be at least 1 character long'),
    price: z.number().min(1, 'Price must be at least 1'),
    discounted_price: z.number().min(0, 'Discounted price must be at least 0'),
    category: z.number().min(1, 'Please choose at least one category'),
    images: z.any()
        .refine(imageRefine.existFn, imageRefine.existMg)
        .refine(imageRefine.acceptFn, imageRefine.acceptMg),
    // .refine(imageRefine.maxsizeFn, imageRefine.maxsizeMg),
    // inventory: z.string().transform(transformToNumber).refine(isFiniteNumber, { message: 'Invalid inventory number' }),
    inventory: z.number().min(1, 'Quantity must be at least 1'),
    status: z.nativeEnum(ProductStatus),
})