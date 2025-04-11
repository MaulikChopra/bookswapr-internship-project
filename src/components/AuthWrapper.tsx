'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthWrapper;
