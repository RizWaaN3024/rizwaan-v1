import { z } from 'zod';

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "One letter? Really? That's just rude." })
        .max(60, { message: 'Easy there. Just a name, not a biography.' }),
    email: z
        .string()
        .trim()
        .min(1, { message: 'An email would be helpful.' })
        .email({ message: "That email wouldn't fool my grandma's spam filter." }),
    message: z
        .string()
        .trim()
        .min(10, { message: "At least say 'hi'. Preferably more." })
        .max(2000, { message: "TL;DR? You've written a novella." }),
    // Honeypot — must be empty
    website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
