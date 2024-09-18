import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const withAuth = (Component: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const session = await getSession();

        if (!session) {
          router.push('/api/auth/login');  
        } else {
          setIsAuthenticated(true);
        }
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
