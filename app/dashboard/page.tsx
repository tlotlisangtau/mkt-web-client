"use client"  
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

const SomeProtectedComponent = () => {
  // Define the state with the correct type
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log('Session:', session);
      setSession(session); // This is now correctly typed
    };

    fetchSession();
  }, []);

  if (!session) {
    return <div>Please log in first</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}!</h1>
      {/* Render the protected content */}
    </div>
  );
};

export default SomeProtectedComponent;
