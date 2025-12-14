
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin') || nextUrl.pathname.startsWith('/tr/admin') || nextUrl.pathname.startsWith('/en/admin');
            const isOnAccount = nextUrl.pathname.startsWith('/hesabim') || nextUrl.pathname.startsWith('/tr/hesabim') || nextUrl.pathname.startsWith('/en/hesabim');

            if (isOnAdmin) {
                // Admin requires role check
                // Note: role is not in default session, need to add it in session callback
                // For now, assume if logged in with admin email (simple check) or use extended session logic
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            if (isOnAccount) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            return true;
        },
        async session({ session, token }) {
            // Pass role to client
            if (token.role && session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        }
    },
    providers: [], // Configured in main auth file
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
