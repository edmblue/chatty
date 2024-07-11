import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const LoginPage = () => {
  return (
    <div className="max-container padding-container h-screen bg-primary-gray flex justify-center items-center">
      <div className="bg-white padding-container py-12 rounded-lg shadow-md">
        <h1 className="text-2xl font-black text-center py-2">Welcome back!</h1>
        <h2 className="text-sm text-center text-gray-500">
          Log in to access to <span className="font-semibold">Chatty</span> and
          get to know new people
        </h2>
        <form className="py-3 space-y-3">
          <div>
            <label className="font-sembold text-sm">Email or username</label>
            <input
              type="text"
              placeholder="Email or username"
              className="input input-bordered w-full text-sm"
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Email or username</label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full text-sm"
            />
          </div>
          <button className="btn w-full">Login</button>
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
