import { z } from 'zod';
import { cardNumberRefine, confirmPasswordRefine, fileRefine, imageRefine, isFiniteNumber, phoneTransform, transformToNumber } from '../utils/helper';
import { FACEBOOK_BASE_URL, INSTAGRAM_BASE_URL } from '../config/urls';

export const phoneAuthSchema = z.object({
    phone_number: z.string()
        .transform(phoneTransform)
});

export const emailSignUpSchema = z.object({
    email: z.string()
        .email(),
});

export const emailSignInSchema = z.object({
    email: z.string()
        .email(),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long'),
});

export const otpVerificationSchema = z.object({
    phone_number: z.string()
        .transform(phoneTransform),
    otp: z.string()
        .length(6, 'OTP must be a six digit number').regex(/^\d+$/, 'OTP must be a 6 digit number'),
})

export const resendOtpSchema = z.object({
    phone_number: z.string()
        .transform(phoneTransform),
})

export const createPasswordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string()
        .min(8, 'Password must be at least 8 characters long')
}).refine(confirmPasswordRefine.Fn, confirmPasswordRefine.Opt);

export const verifyEmailSchema = z.object({
    confirmation_token: z.string({ message: 'Invalid url' }),
    vendor_id: z.string({ message: 'Invalid url' }),
})

export const setupAccountFirstStepSchema = z.object({
    first_name: z.string()
        .min(2, 'First name must be at least 2 characters long'),
    last_name: z.string()
        .min(2, 'Last name must be at least 2 characters long'),
    email: z.string()
        .email(),
})

export const setupAccountLastStepSchema = z.object({
    name: z.string()
        .min(1, 'Company name must be at least 1 character long'),
    legal_address: z.string()
        .min(1, 'Address must be at least 1 character long'),
    category: z.number()
        .min(1, 'Please choose at least one category'),
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
    NEW = 'NEW',
    ACTIVE = 'ACTIVE',
    DRAFT = 'DRAFT',
    ARCHIVED = 'ARCHIVED',
}
export const createProductSchema = z.object({
    title: z.string({ message: 'Product title is a required field' })
        .min(1, { message: 'Product name must be at least 1 character long' }),
    description: z.string()
        .min(1, 'Description must be at least 1 character long'),
    price: z.number()
        .min(1, 'Price must be at least 1'),
    discounted_price: z.number()
        .min(0, 'Discounted price must be at least 0'),
    category: z.number()
        .min(1, 'Please choose at least one category'),
    images: z.array(
        z.any()
            .refine(imageRefine.existFn, imageRefine.existMg)
            .refine(imageRefine.acceptFn, imageRefine.acceptMg),
    ),
    // .refine(imageRefine.maxsizeFn, imageRefine.maxsizeMg),
    // inventory: z.string().transform(transformToNumber).refine(isFiniteNumber, { message: 'Invalid inventory number' }),
    inventory: z.number()
        .min(1, 'Quantity must be at least 1'),
    status: z.nativeEnum(ProductStatus),
})

export const updateProductSchema = createProductSchema
    .partial()
    .extend({
        id: z.number()
            .min(1, 'Invalid product id'),
    })

export const personalInfoSettingSchema = z.object({
    first_name: z.string()
        .min(2, 'First name must be at least 2 characters long'),
    last_name: z.string()
        .min(2, 'Last name must be at least 2 characters long'),
    email: z.string()
        .email(),
    phone_number: z.string()
        .transform(phoneTransform),
    // address: z.string().min(1, 'Address must be at least 1 character long'),
})

export const shopInfoSettingSchema = z.object({
    shop_name: z.string()
        .min(1, 'Shop name must be at least 1 character long'),
    categories: z.array(
        z.number()
            .min(1, 'Please choose at least one category')
    ),
    legal_address: z.string()
        .min(1, 'Address must be at least 1 character long'),
    website: z.string()
        .url({ message: 'Invalid website url' }),
    description: z.string()
        .min(1, 'Description must be at least 1 character long'),
    instagram: z.string()
        .url({ message: 'Invalid instagram url' })
        .startsWith(INSTAGRAM_BASE_URL, { message: 'Url must be an instagram url' }),
    facebook: z.string()
        .url({ message: 'Invalid facebook url' })
        .startsWith(FACEBOOK_BASE_URL, { message: 'Url must be a facebook url' }),
    profile_image: z.any()
        .refine(imageRefine.existFn, imageRefine.existMg)
        .refine(imageRefine.acceptFn, imageRefine.acceptMg),
})

export const billingInfoSettingSchema = z.object({
    card_holder_name: z.string()
        .min(1, 'Card holder name must be at least 1 character long'),
    card_number: z.string()
        .refine(cardNumberRefine.Fn, cardNumberRefine.Opt),
    expiry_date: z.string()
        .regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date format'),
    cvv: z.string()
        .length(3, 'CVV must be a three digit number')
        .regex(/^\d+$/, 'CVV must be a three digit number'),
})

export const changePasswordSettingSchema = z.object({
    old_password: z.string()
        .min(6, 'Password must be at least 6 characters long'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters long'),
    confirm_password: z.string()
        .min(6, 'Password must be at least 6 characters long')
}).refine(confirmPasswordRefine.Fn, confirmPasswordRefine.Opt);

export const promoCampaignSchema = z.object({
    name: z.string()
        .min(1, 'Title must be at least 1 character long'),
    item_list: z.array(
        z.number()
            .min(1, 'Please choose at least one item')
    ),
    start_date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    end_date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
    start_time: z.string()
        .regex(/^\d{2}:\d{2} (AM)|(PM)$/, 'Invalid time format'),
    end_time: z.string()
        .regex(/^\d{2}:\d{2} (AM)|(PM)$/, 'Invalid time format'),
    banner: z.any()
        .refine(imageRefine.existFn, imageRefine.existMg)
        .refine(imageRefine.acceptFn, imageRefine.acceptMg),
    budgeting: z.string()
        .min(1, 'Budgeting must be at least 1 character long'),
    budget: z.number()
        .min(1, 'Budget must be at least 1'),
})


export const promoCampaignServiceDiscountSchema = promoCampaignSchema.extend({
    item_list: z.array(
        z.number()
            .min(1, 'Please choose at least one item')
    ),
    description: z.string()
        .min(1, 'Description must be at least 1 character long'),
    discount_type: z.string()
        .min(1, 'Discount type must be at least 1 character long'),
    discount_amount: z.number()
        .min(1, 'Discount must be at least 1'),
})

export const promoCampaignBannerSchema = promoCampaignSchema.extend({
    destination: z.string()
        .min(1, 'Description must be at least 1 character long'),
    item_list: z.array(
        z.number()
            .min(1, 'Please choose at least one item')
    ),
    discount_type: z.string()
        .min(1, 'Discount type must be at least 1 character long'),
    discount_amount: z.number()
        .min(1, 'Discount must be at least 1'),
})