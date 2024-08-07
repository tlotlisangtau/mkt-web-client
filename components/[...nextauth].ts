// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { username, password } = credentials;

        // Replace this with your own logic
        const user = { id: '1', name: 'Admin', email: 'admin@example.com' };

        if (username === 'admin' && password === 'password') {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/Login',
    error: '/error'
  }
});
