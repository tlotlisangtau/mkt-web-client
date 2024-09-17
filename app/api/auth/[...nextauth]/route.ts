import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret || !facebookClientId || !facebookClientSecret) {
  throw new Error('Missing environment variables for authentication providers.');
}

export default NextAuth({
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
    async signIn({ account, profile }) {
      console.log('SignIn callback:', { account, profile });
      if (account?.provider === 'google') {
        const emailVerified = (profile as any).email_verified as boolean | undefined;
        const email = profile?.email as string | undefined;
        if (emailVerified === undefined || email === undefined) {
          return false;
        }
        return emailVerified && email.endsWith('@example.com');
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
})  
