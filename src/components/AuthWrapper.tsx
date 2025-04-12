'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUser } from './UserContext';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useUser(); // Use the user context

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      setIsLoggedIn(false);
      router.push('/login');
    } else {
      setIsLoggedIn(true);
       const storedUser = localStorage.getItem('user');
            if (storedUser && !user) {
                setUser(JSON.parse(storedUser));
            }
    }
  }, [router, setUser, user]);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoggedIn ? <>{children}</> : null}
    </QueryClientProvider>
  );
};

export default AuthWrapper;
