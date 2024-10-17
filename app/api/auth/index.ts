// /auth/index.ts
import NextAuth from 'next-auth';
import { authOptions } from '../../../next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const handlers = {
  GET: async (req: NextRequest) => NextAuth(authOptions)(req, NextResponse),
  POST: async (req: NextRequest) => NextAuth(authOptions)(req, NextResponse),
};
