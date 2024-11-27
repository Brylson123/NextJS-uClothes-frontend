import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

interface TokenValidationResponse {
    success: boolean;
}

export async function middleware(req: NextRequest) {
    const jwtToken = req.cookies.get('jwt')?.value;

    if (req.nextUrl.pathname === '/admin/login') {
        if (jwtToken) {
            try {
                const { payload } = await jose.jwtVerify(
                    jwtToken,
                    new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
                );
                const tokenValidationResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/getUserByToken/${jwtToken}`
                );
                const validationData: TokenValidationResponse = await tokenValidationResponse.json();

                if (payload && payload.role === 'ADMIN' && validationData.success) {
                    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        }

        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!jwtToken) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
        try {
            const { payload } = await jose.jwtVerify(
                jwtToken,
                new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
            );

            const tokenValidationResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/getUserByToken/${jwtToken}`
            );
            const validationData: TokenValidationResponse = await tokenValidationResponse.json();

            if (!payload || payload.role !== 'ADMIN' || !validationData.success) {
                return NextResponse.redirect(new URL('/admin/login', req.url));
            }

            return NextResponse.next();
        } catch (error) {
            console.error('Error verifying token:', error);
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
