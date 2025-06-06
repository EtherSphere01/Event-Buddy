"use client";

import SignInForm from "./sign-in-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex md:items-center justify-center pt-20 md:pt-0">
      <div className="[filter:drop-shadow(0_6px_8px_rgba(0,0,0,0.2))] w-[29rem] ">
        <div className="md:min-w-96 min-w-80 md:min-h-96 bg-white p-8 m-3 md:m-0 [clip-path:polygon(20px_0%,100%_0%,100%_calc(100%-20px),calc(100%-20px)_100%,0%_100%,0%_20px)] ">
          <h1 className="text-3xl text-textPrimary geist-600">Sign in</h1>
          <p className="my-7 text-center text-textSecondary flex justify-start gap-3 ]">
            New User?
            <span
              className="text-textSecondary underline hover:cursor-pointer"
              onClick={() => (window.location.href = "/signup")}
            >
              Create an account
            </span>
          </p>
          <SignInForm />
          
        </div>
      </div>
    </div>
  );
}
