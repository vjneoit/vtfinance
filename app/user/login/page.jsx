"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { useRouter } from "next/navigation";
import Input from "@/app/user/components/Input"
import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/find-user-byemail/${email}`);
      setUser(response.data);
      console.log(response.data.user_type);

      if (response.data.user_type === 2) {
        router.push('/user/dashboard/superadmin');
      } else {
        router.push('/user/dashboard/user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError("Invalid Credentials");
        
        return;
      }
      setLoading(true)
      await fetchUserData(); // Fetch user data after successful sign-in

    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <>
        <div className=' h-svh w-full  flex justify-center items-center gap-4 flex-col'>

          <div class="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
          <p className=' font-bold text-2xl text-blue-600'>Processing Please wait...</p>
        </div>
      </>
    );
  }



  return (
    <>
      <div className="container mx-auto py-6 ">
        <div className=' lg:w-2/4 md:w-2/3 mx-auto px-6'>
          <h1 className="text-5xl text-center  font-extrabold text-red-500 mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit} action="" method='post' encType="multipart/form-data">
            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className=' bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                {error}
              </div>
            )}
            <button
              type='submit'
              className='w-full bg-red-500 text-white rounded-md py-1.5 hover:bg-red-700 mt-4'
            >
               Submit
              
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
