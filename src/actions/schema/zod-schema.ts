import { z } from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';

export const phoneSignUpSchema = z.object({
    phone_number: z.string().transform((arg, ctx) => {
        const phone = parsePhoneNumberFromString(arg, {
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
