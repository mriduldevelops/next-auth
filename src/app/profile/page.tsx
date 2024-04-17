"use client"
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const resposne = await axios.post("/api/users/myprofile");
      console.log(resposne.data);
      setData(resposne.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
  };

  const logout = async () =>{
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successfully")
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast(error.message);
    }
  }
  return <div className="bg-zinc-800 min-h-screen flex justify-center items-center flex-col gap-2">
    <h1 className="text-3xl text-white font-bold">Profile Page</h1>
    <hr />
    <h2 className="text-white text-sm font-semibold">
      {data === "nothing"? "Nothing": <Link href={`/profile/${data}`}>Visit profile</Link>}
    </h2>
    <hr />
    
    <button className="py-2 px-4 rounded-md bg-green-500 text-white font-bold" onClick={getUserDetails}>
      Get User Details
    </button>
    <button className="py-2 px-4 rounded-md bg-blue-500 text-white font-bold" onClick={logout}>
      Logout
    </button>
  </div>;
}
