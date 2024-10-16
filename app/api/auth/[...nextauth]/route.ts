import  NextAuthHandler  from 'next-auth';
import  authOptions from '../../../../next-auth';

const handler = NextAuthHandler(authOptions);

export { handler as GET, handler as POST };
