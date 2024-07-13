'use client';

import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const logOutUser = async () => {
    try {
      setLoading(true);

      const req = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await req.json();

      if (res.msg) {
        throw new Error(res.msg);
      }

      localStorage.removeItem('chat-user');
      setAuthUser(null);
      router.replace('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { logOutUser, loading };
};

export default useLogOut;
