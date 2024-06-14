"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import { useRouter } from "next/navigation";
import Input from "@/app/user/components/Input"
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultData = { userid: "", name: "", mobile_no: "", vehicle_no: "", rc: "", rc_no: "", aadharcard: "", aadharcard_no: "", pan_card: "", pan_card_no: "", old_policy: "", old_policy_no: "" };

export default function Register() {
  const { data: session } = useSession();
  // const [user, setUser] = useState('');
  const [data, setData] = useState(defaultData);
  // const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const emailid = session?.user?.email;
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (emailid) { // Check if emailid is available
        try {
          const response = await axios.get(`/api/user/find-user-byemail/${emailid}`);
          setData({ ...data, userid: response.data._id });

        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [emailid]);

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const fieldName = e.target.name;
    setData({ ...data, [fieldName]: e.target.files[0] });
  };

  const handleUpload = async (fileType) => {
    const formData = new FormData();
    formData.append('file', data[fileType]);

    try {
      const response = await axios.post('/api/user/upload', formData);
      return response.data.file.url; // Return the uploaded file URL
    } catch (error) {
      console.error('Error uploading file: ', error);
      return null;
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when registering

    const requiredFields = ['name', 'userid', 'mobile_no', 'vehicle_no', 'rc', 'rc_no', 'aadharcard', 'aadharcard_no', 'pan_card', 'pan_card_no', 'old_policy', 'old_policy_no'];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      alert('Please fill all fields');
      setLoading(false); // Reset loading state
      return;
    }

    const uploadedFiles = {};
    for (const fileType of ['aadharcard', 'rc', 'pan_card', 'old_policy']) {
      if (data[fileType] instanceof File) {
        const fileUrl = await handleUpload(fileType);
        uploadedFiles[fileType] = fileUrl;
      }
    }

    try {
      const response = await axios.post('/api/insurance/create', { ...data, ...uploadedFiles });
      setData(defaultData);

      if (response.status === 201) {
        toast.success("Insurance Created");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className=' h-svh w-full  flex justify-center items-center gap-4 flex-col'>

          <div class="w-24 h-24 rounded-full border-4 border-gray-100 border-t-gray-500 animate-spin"></div>
          <p className=' font-medium text-2xl text-gray-400'>Processing Please wait...</p>
        </div>
      </>
    );
  }


  return (
    <>

      <div className="container mx-auto py-6 ">
        <div className=' lg:w-3/4  mx-auto px-6'>
          <h1 className="text-5xl text-center  font-extrabold text-red-500 mb-4">
            Insurance
          </h1>


          <ToastContainer />



          <form method='post'>


            <div className=' grid lg:grid-cols-2 grid-cols-1 gap-4'>
              <div className=' lg:col-span-2'>

                <Input

                  type="hidden"
                  name="userid"
                  id="name"
                  placeholder="name"
                  className="p-2 mb-2 border-b w-full  focus:outline-none focus:border-red-500"
                  value={data.userid}
                  // readOnly
                  onChange={(e) => onValueChange(e)}
                />
              </div>



              <Input
                label="Name"
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.name}
                onChange={(e) => onValueChange(e)}
              />


              <Input
                label="Mobile_no"
                type="tel"
                name="mobile_no"
                id="mobile_no"
                placeholder="mobile_no"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.mobile_no}
                onChange={(e) => onValueChange(e)}
              />


              <Input
                label="Vehicle_no"
                type="text"
                name="vehicle_no"
                id="vehicle_no"
                placeholder="vehicle_no"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.vehicle_no}
                onChange={(e) => onValueChange(e)}
              />

              <Input
                label="Registration Certificate Number"
                type="text"
                name="rc_no"
                id="rc_no"
                placeholder="rc_no"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.rc_no}
                onChange={(e) => onValueChange(e)}
              />

              <Input
                label="Registration Certificate"
                type="file"
                name="rc"
                id="rc"
                placeholder="rc"
                className="p-2 mb-2 -mt-[5.1px] border-b w-full focus:outline-none focus:border-red-500"
                onChange={handleFileChange}
              />


              <Input
                label="Aadharcard Number"
                type="number"
                name="aadharcard_no"
                id="aadharcard_no"
                placeholder="aadharcard_no"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.aadharcard_no}
                onChange={(e) => onValueChange(e)}
              />

              <Input
                label="Aadharcard"
                type="file"
                name="aadharcard"
                id="aadharcard"
                placeholder="aadharcard"
                className="p-2 mb-2 -mt-[5.1px] border-b w-full focus:outline-none focus:border-red-500"

                onChange={handleFileChange}
              />



              <Input
                label="Pan_card Number"
                type="text"
                name="pan_card_no"
                id="pan_card_no"
                placeholder="pan_card_no"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.pan_card_no}
                onChange={(e) => onValueChange(e)}
              />


              <Input
                label="Pan_card"
                type="file"
                name="pan_card"
                id="pan_card"
                placeholder="pan_card"
                className="p-2 mb-2 -mt-[5.1px] border-b w-full focus:outline-none focus:border-red-500"
                onChange={handleFileChange}
              />


              <Input
                label="Old_policy Number"
                type="text"
                name="old_policy_no"
                id="old_policy_no"
                placeholder="old_policy_no"
                className="p-2 mb-2 border-b w-full focus:outline-none focus:border-red-500"
                value={data.old_policy_no}
                onChange={(e) => onValueChange(e)}
              />


              <Input
                label="Old_policy"
                type="file"
                name="old_policy"
                id="old_policy"
                placeholder="old_policy"
                className="p-2 mb-2 -mt-[5.1px] border-b w-full focus:outline-none focus:border-red-500"
                onChange={handleFileChange}
              />

            </div>
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
