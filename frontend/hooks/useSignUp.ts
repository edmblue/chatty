'use client';

import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface userInputs {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignUp = (inputs: userInputs) => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const signUpUser = async () => {
    const { fullName, username, email, password, confirmPassword, gender } =
      inputs;

    const success = handleInputErrors(inputs);

    if (!success) return;

    try {
      setLoading(true);

      const req = await fetch('https://chatty-rb.vercel.app/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await req.json();

      if (res.msg) {
        throw new Error(res.msg);
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
    const { fullName, username, email, password, confirmPassword, gender } =
      inputs;

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      toast.error('The are fields that are missing');
      return false;
    }

    if (password.length < 6) {
      toast.error('Passwords must be at least 6 characters');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return false;
    }

    return true;
  };
  return { signUpUser, loading };
};

export default useSignUp;
