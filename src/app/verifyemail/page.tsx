"use client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function VerifyEmail() {
//   const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const {query} = router;
    // const newToken = query.token;
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="bg-zinc-800 min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-white text-3xl font-bold mb-4">Verify Email</h1>
      <div className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold">
        <h2>{token ? `${token}` : "No Token"}</h2>
      </div>
      {verified && (
        <div className="my-2">
          <h3 className="font-bold text-green-500">Email Verified</h3>
          <Link href="/login" className="font-bold text-blue-500">Login{"->"}</Link>
        </div>
      )}
      {error && (
        <div className="my-2">
          <h3 className="font-bold text-red-500">Error!</h3>
        </div>
      )}
    </div>
  );
}
