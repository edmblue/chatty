'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import useLogIn from '@/hooks/useLogIn';
import ButtonSpinner from '@/components/button-spinner';

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { loading, logInUser } = useLogIn(inputs);

  const handleLogIn = async (e: FormEvent) => {
    e.preventDefault();

    await logInUser();
  };
  return (
    <div className="padding-container h-screen bg-primary-gray flex justify-center items-center">
      <div className="bg-white padding-container py-12 rounded-lg shadow-md">
        <h1 className="text-2xl font-black text-center py-2">Welcome back!</h1>
        <h2 className="text-sm text-center text-gray-500">
          Log in to access to <span className="font-semibold">Chatty</span> and
          get to know new people
        </h2>
        <form onSubmit={handleLogIn} className="py-3 space-y-3">
          <div>
            <label className="font-sembold text-sm">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full text-sm"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Password</label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full text-sm"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <button disabled={loading} type="submit" className="btn w-full">
            {loading ? <ButtonSpinner /> : 'Log in'}
          </button>
        </form>
        <Link
          href="/signup"
          className="text-sm w-full text-center underline underline-offset-4 hover:text-gray-600 text-gray-500 flex justify-center"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
