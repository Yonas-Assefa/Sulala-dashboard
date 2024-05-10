import { z } from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';

export const phoneAuthSchema = z.object({
    phone_number: z.string().transform((arg, ctx) => {
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
    })
});

export const emailSignUpSchema = z.object({
    email: z.string().email(),
});

export const emailSignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
