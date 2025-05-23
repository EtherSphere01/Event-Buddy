"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCALHOST}/auth/signin`,
        {
          email,
          password,
        }
      );
      const { data } = res;
      if (data?.message === undefined) {
        toast.success("Login successful");
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      } else {
        toast.error(data?.message || "Login failed");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Invalid credentials or server error";
      toast.error(message);
    }
  };

  return (
    <form className="space-y-7" onSubmit={handleOnSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block font-medium text-textPrimary mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block font-medium text-textPrimary mb-2"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-t from-btnPrimaryStart to-btnPrimaryEnd text-white py-3 rounded-md hover:bg-gradient-to-b hover:from-btnPrimaryStart hover:to-btnPrimaryEnd transition"
      >
        Sign In
      </button>
    </form>
  );
}
