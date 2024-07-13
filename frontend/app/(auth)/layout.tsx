'use client';

import Spinner from '@/components/spinner';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { authUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      router.replace('/chat');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Spinner />;
  }
  return <div className="min-h-screen">{children}</div>;
}
