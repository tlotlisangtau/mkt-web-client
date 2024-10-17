import NextAuth, { AuthOptions, Account, Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const googleClientId = process.env.GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID!;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET!;

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    FacebookProvider({
      clientId: facebookClientId,
      clientSecret: facebookClientSecret,
    }),
  ],
  pages: {
    signIn: '/api/auth/login',
    error: '/api/auth/error',
  },
  callbacks: {
    async signIn({ account, profile }: { account: Account | null; profile?: Profile | undefined }): Promise<boolean> {
      if (account?.provider === 'google') {
        const emailVerified = (profile as any).email_verified as boolean | undefined;
        const email = profile?.email as string | undefined;
        // Ensure a boolean is returned
        return Boolean(emailVerified && email?.endsWith('@example.com'));
      }
      // Default to true for other providers or cases
      return true;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
