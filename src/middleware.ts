import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/es/login') {
        return intlMiddleware(request);
    }

    const hasVisited = request.cookies.get('visited');

    if (!hasVisited) {
        const response = NextResponse.redirect(new URL('/es/login', request.url));
        response.cookies.set('visited', 'true', { path: '/', httpOnly: true });
        return response;
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};