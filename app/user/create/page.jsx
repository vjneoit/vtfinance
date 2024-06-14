"use client"
import { useState ,useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { useRouter } from "next/navigation";
import Input from "@/app/user/components/Input"



const defaultData = { name: "", email: "", mobile_no: "", password: "", aadharcard: null, };

export default function Register() {

  const [data, setData] = useState(defaultData);
  const [uploadurl, setUploadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, aadharcard: e.target.files[0] });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", data.aadharcard);

    try {
      const response = await axios.post('../api/user/upload', formData);
      setUploadUrl(response.data.file.url);
    } catch (error) {
      console.error('Error uploading file: ', error);
      setLoading(false);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.mobile_no || !data.password || !data.aadharcard) {
      alert("Please fill all fields");
      return;
    }

    if (data.aadharcard instanceof File) {
      await handleUpload();
    }
  };

  useEffect(() => {
    const registerUser = async () => {
      if (uploadurl) {
        try {
          const postData = { ...data, aadharcard: uploadurl };
          const response = await axios.post("../api/user/create", postData);
          setData(defaultData);
          setUploadUrl(null);
          setLoading(true);

          if (response.status === 201) {
            router.push("login");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    registerUser();
  }, [uploadurl]); // Execute when uploadurl changes

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
            Registration
          </h1>






          <form action="" method='post' enctype="multipart/form-data">

            <Input
              label="Name"
              type="text"
              name="name"
              id="originalName"
              placeholder="Name"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              value={data.name}
              onChange={(e) => onValueChange(e)}
            />


            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              value={data.email}
              onChange={(e) => onValueChange(e)}
            />


            <Input
              label="Mobile_no"
              type="tel"
              name="mobile_no"
              id="mobile_no"
              placeholder="mobile_no"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              value={data.mobile_no}
              onChange={(e) => onValueChange(e)}
            />


            <Input
              label="aadharcard"
              type="file"
              name="aadharcard"
              id="aadharcard"
              placeholder="aadharcard"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              onChange={handleFileChange} // Updated to handle file change
            />


            <Input
              label="password"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="p-2 mb-4 border-b w-full focus:outline-none focus:border-red-500"
              value={data.password}
              onChange={(e) => onValueChange(e)}
            />

           

            <button
              onClick={(e) => onRegister(e)}
              type='submit'
              className='w-full bg-red-500 text-white rounded-md py-1.5 hover:bg-red-700 mt-4'
            >Submit</button>
          </form>
        </div>
      </div>

    </>
  )
}
