'use client';

import useSignUp from '@/hooks/useSignUp';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import ButtonSpinner from '@/components/button-spinner';

const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signUpUser } = useSignUp(inputs);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await signUpUser();
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="bg-primary-gray hidden lg:block h-full" />
      <div className="flex justify-center flex-col items-center h-full relative">
        <Link href="/login">
          <button className="btn absolute right-4 top-3">Login</button>
        </Link>
        <h1 className="text-2xl font-black text-center py-2">
          Create an account
        </h1>
        <h2 className="text-sm text-center text-gray-500">
          Enter your email below to create your account
        </h2>
        <form onSubmit={handleSubmit} className="py-3 space-y-3">
          <div>
            <label className="font-sembold text-sm">Name</label>

            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full text-sm h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Email</label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full text-sm h-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full text-sm h-10"
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
              className="input input-bordered w-full text-sm h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Confirm password</label>
            <input
              type="text"
              placeholder="Confirm password"
              className="input input-bordered w-full text-sm h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3 text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inputs.gender == 'female'}
                onChange={(e) => setInputs({ ...inputs, gender: 'female' })}
                className="checkbox w-5 h-5 rounded-sm"
              />
              <label>Female</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inputs.gender == 'male'}
                onChange={(e) => setInputs({ ...inputs, gender: 'male' })}
                className="checkbox w-5 h-5 rounded-sm"
              />
              <label>Male</label>
            </div>
          </div>
          <button disabled={loading} type="submit" className="btn w-full">
            {loading ? <ButtonSpinner /> : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
