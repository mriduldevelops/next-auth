"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);

      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="bg-zinc-800 flex justify-center items-center min-h-screen">
      <div className="bg-white py-4 px-8 rounded-xl ">
        <h1 className="text-center text-2xl font-bold mt-2">
          {loading ? "Processing" : "Login"}
        </h1>
        <div className="mt-4">
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
            onClick={onLogin}
            disabled={buttonDisabled || loading}
          >
            SignUp
          </button>
          <p className="text-sm my-3 font-semibold">
            Don't have an account?{" "}
            <Link href={"/signup"} className="text-blue-500">
              SignUp
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
