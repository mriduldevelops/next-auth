import React from 'react'

export default function MyProfileInfo({params}:any) {
    console.log(params)
  return (
    <div className="bg-zinc-800 min-h-screen flex justify-center items-center flex-col gap-2">
        <h1 className="text-3xl text-white font-bold">My Profile Info</h1>
        <div className="py-2 px-4 rounded-md bg-green-500 text-white font-bold">{params.id}</div>
    </div>

  )
}
