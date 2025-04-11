'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      router.push('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoggedIn ? <>{children}</> : null}
    </QueryClientProvider>
  );
};

export default AuthWrapper;
