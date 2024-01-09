'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const router = useRouter();
  const onSubmit = () => {
    if (!name || !password) {
      alert("Please enter information");
    } else {
      login(name, password)
        .then((res) => router.push("/profile"))
        .catch((e) => alert(e));
    }
  };

  return (
    <main className="signin w-screen h-screen flex flex-wrap place-content-center">
      <div className="mainboard max-w-[480px] max-h-[689px] sm:w-[480px] w-[90%] text-white">
        <div className="text-center text-[48px] font-bold">
          Log in
        </div>
        <form
          className="container"
          onSubmit={e => e.preventDefault()}
          noValidate
        >
          <label className="text-[12px]">Enter your email address</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="common-input w-full my-4"
            placeholder="johndoe@gmail.com"
          />
          <label className="text-[12px]">Enter your password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="common-input w-full my-4"
            placeholder="Type your password"
            type="password"
          />
          <button
            onClick={onSubmit}
            className="common-btn w-full h-[48px] mt-[30px]"
          >
            Log in
          </button>
          <div className='flex flex-wrap justify-between items-center text-white mt-[30px]'>
            <div className='split-line w-2/5'></div>
            <div>or</div>
            <div className='split-line w-2/5'></div>
          </div>
          <button
            // onClick={onSubmit}
            className="common-btn w-full h-[48px] mt-[30px]"
          >
            G
          </button>
          <div className='w-full text-[14px] text-center text-white mt-[70px]'>
            <span>Don't have an account yet?</span>
            <Link
              href="/auth/signup"
              className='cursor-pointer ml-[5px]'
            >Sign up</Link>
          </div>
        </form>
      </div>
    </main>
  )
}