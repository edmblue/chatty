'use client';

import { useState } from 'react';
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
  const signUpUser = async () => {
    const { fullName, username, email, password, confirmPassword, gender } =
      inputs;

    const success = handleInputErrors(inputs);

    if (!success) return;

    try {
      setLoading(true);

      const req = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = req.json();

      console.log(res);
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
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return false;
    }
  };
  return { signUpUser, loading };
};

export default useSignUp;
