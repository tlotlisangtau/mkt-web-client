import NextAuth from 'next-auth';
import { authOptions } from '../../../../next-auth';
import { NextRequest, NextResponse } from 'next/server';

// Handling POST requests (which is common for NextAuth)
export async function POST(request: NextRequest) {
  return await NextAuth(authOptions);
}

// If you need to handle GET requests as well
export async function GET(request: NextRequest) {
  return await NextAuth(authOptions);
}
