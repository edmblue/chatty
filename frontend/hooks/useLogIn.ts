'use client';

import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface userInputs {
  username: string;
  password: string;
}

const useLogIn = (inputs: userInputs) => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const logInUser = async () => {
    const success = handleInputErrors(inputs);

    if (!success) return;

    try {
      setLoading(true);

      const req = await fetch('https://chatty-rb.vercel.app/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const res = await req.json();

      console.log(res);

      if (res.error) {
        throw new Error(res.error);
      }

      localStorage.setItem('chat-user', JSON.stringify(res));
      setAuthUser(res);
      toast.success('Success!');
      router.replace('/chat');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputErrors = (inputs: userInputs) => {
    const { username, password } = inputs;

    if (!username || !password) {
      toast.error('The are fields that are missing');
      return false;
    }

    if (password.length < 6) {
      toast.error('Passwords must be at least 6 characters');
      return false;
    }

    return true;
  };
  return { logInUser, loading };
};

export default useLogIn;
