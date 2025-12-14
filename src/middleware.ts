import createMiddleware from 'next-intl/middleware';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const intlMiddleware = createMiddleware({
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    localePrefix: 'always'
});

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    // Auth logic handled by authConfig.callbacks.authorized
    // If we're here, it means we passed auth check or public route
    // Now pass to intl middleware

    // Auth middleware might interfere with next-intl if it returns response for public routes
    // But since it just attaches session, it matches. 
    // However, protect routes logic in authorized callback might redirect.

    return intlMiddleware(req);
});

export const config = {
    // Matcher: Exclude api, assets, etc.
    // Must include localized paths for intl to work
    matcher: ['/', '/(tr|en)/:path*', '/hesabim/:path*', '/admin/:path*']
};
