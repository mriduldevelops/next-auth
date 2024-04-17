"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("signup success", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="bg-zinc-800 flex justify-center items-center min-h-screen">
      <div className="bg-white py-4 px-8 rounded-md ">
        <h1 className="text-center text-2xl font-bold mt-2">
          {loading ? "Processing" : "SignUp"}
        </h1>
        <div className="mt-4">
          <div className="my-2 flex flex-col">
            <label htmlFor="username" className="text-xs font-semibold">
              Username
            </label>
            <input
              className="border-2 rounded-md border-zinc-500 px-2 py-1 text-sm outline-none"
              id="username"
              value={user.username}
              placeholder="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="email" className="text-xs font-semibold">
              Email
            </label>
            <input
              className="border-2 rounded-md border-zinc-500 px-2 py-1 text-sm outline-none"
              id="email"
              value={user.email}
              placeholder="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label htmlFor="password" className="text-xs font-semibold">
              Password
            </label>
            <input
              className="border-2 rounded-md border-zinc-500 px-2 py-1 text-sm outline-none"
              id="password"
              value={user.password}
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
            />
          </div>
          {buttonDisabled && (
            <span className="text-xs text-red-500">
              Please fill the required fields
            </span>
          )}
          <button
            className={`w-full rounded-md mt-3 py-1 text-white font-bold text-lg ${
              buttonDisabled || loading ? "bg-zinc-600" : "bg-zinc-800"
            }`}
            onClick={onSignup}
            disabled={buttonDisabled || loading}
          >
            SignUp
          </button>
          <p className="text-sm my-3 font-semibold">
            Already have an account?{" "}
            <Link href={"/login"} className="text-blue-500">
              Login
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
