// src/app/middleware.ts
import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";
import * as jose from "jose";


export async function middleware(req: NextRequest) {
    const jwtToken = await cookies().get("jwt")?.value
    if (!jwtToken) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    try {

        const {payload} = await jose.jwtVerify(jwtToken, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
        if (!payload || payload.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return  NextResponse.redirect(new URL('/admin/login', req.url));
    }
}

export const config = {
    matcher: ['/admin/dashboard']
};
