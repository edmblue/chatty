'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '@/components/spinner';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: AuthLayoutProps) {
  const { authUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Spinner />;
  }
  return <div className="h-screen">{children}</div>;
}
