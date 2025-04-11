'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token from local storage", token);
    if (!token) {
      console.log("no token, redirecting to login");
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthWrapper;
