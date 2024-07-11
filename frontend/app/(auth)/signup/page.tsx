import Link from 'next/link';

const SignUpPage = () => {
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
        <form className="py-3 space-y-3">
          <div>
            <label className="font-sembold text-sm">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full text-sm h-10"
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Email</label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full text-sm h-10"
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full text-sm h-10"
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Password</label>
            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full text-sm h-10"
            />
          </div>
          <div>
            <label className="font-sembold text-sm">Confirm password</label>
            <input
              type="text"
              placeholder="Confirm password"
              className="input input-bordered w-full text-sm h-10"
            />
          </div>
          <div className="flex gap-3 text-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox w-5 h-5"
              />
              <label>Female</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox w-5 h-5"
              />
              <label>Male</label>
            </div>
          </div>
          <button className="btn w-full">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
