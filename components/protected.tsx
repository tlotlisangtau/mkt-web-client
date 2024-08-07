// pages/protected.tsx

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProtectedPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/Login');
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session?.user?.name}</p>
      <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Sign Out</button>
    </div>
  );
};

export default ProtectedPage;
