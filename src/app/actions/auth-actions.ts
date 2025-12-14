'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: unknown,
    formData: FormData,
) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');

        // Ensure email and password are strings before passing to signIn
        if (typeof email !== 'string' || typeof password !== 'string') {
            return { success: false, message: 'Invalid input.' };
        }

        await signIn('credentials', { email, password, redirect: false });

        // Log event - fire and forget (import dynamically or ignore promise to prevent blocking)
        const { logEvent } = await import("@/lib/services/analytics");
        await logEvent("USER_LOGIN", { email });

        return { success: true, message: 'Giriş başarılı' };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { success: false, message: 'Hatalı e-posta veya şifre.' };
                default:
                    return { success: false, message: 'Bir hata oluştu.' };
            }
        }
        throw error;
    }
}
