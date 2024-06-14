"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
export default function Myinsurance() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [insurance, setInsurance] = useState([]);

  const emailid = session?.user?.email;

  useEffect(() => {
    const fetchUser = async () => {
      if (emailid) {
        try {
          const response = await axios.get(`/api/user/find-user-byemail/${emailid}`);
          setUserId(response.data._id);
          console.log("User ID fetched successfully");
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };

    fetchUser();
  }, [emailid]);

  useEffect(() => {
    const fetchinsurance = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/insurance/find-insurance-userid/${userId}`);
          setInsurance(response.data);
          console.log("Insurance data fetched successfully");
        } catch (error) {
          console.error('Error fetching insurance:', error);
        }
      }
    };

    fetchinsurance();

  }, [userId]);

  return (
    <>
      <div className=' p-4 text-2xl font-bold text-gray-600'>
        All insurance by {session?.user?.name}
      </div>
      <div className="container mx-auto lg:px-4 m-4">

        <div className=' grid md:grid-cols-2 gap-8'>
          {insurance.map(insurance => (


            <div key={insurance._id} className="grid shadow max-w-3xl gap-2 p-4 sm:grid-cols-2 bg-white rounded-md border-t-4 border-red-400">
              <div className="grid">
               
                <div className="bg-white flex min-h-[60px]   items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                 <span className=' font-bold me-2'>Name: </span>{insurance.name}
                </div>
              </div>

              <div className="grid">
                

                <div className="bg-white flex min-h-[60px] items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <span  className=' font-bold me-2'>Vechicle number:</span>{insurance.vehicle_no}
                </div>
              </div>

              <div className="grid">
              
                <div className="bg-white flex min-h-[60px] items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <span  className=' font-bold me-2'>Rc number:</span>{insurance.rc_no}
                </div>
              </div>

              <div className="grid">
                

                <div className="bg-white flex min-h-[60px]  items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <span  className=' font-bold me-2'>UUId number:</span>{insurance.aadharcard_no}
                </div>
              </div>

              <div className="grid">
                

                <div className="bg-white flex min-h-[60px] items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <span  className=' font-bold me-2'>Pan number:</span> {insurance.pan_card_no}
                </div>
              </div>

              <div className="grid">
                
                <div className="bg-white flex min-h-[60px] items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <span  className=' font-bold me-2'>Old Ploicy number:</span> {insurance.old_policy_no}
                </div>
              </div>

              <div className="grid">
                {/* <label htmlFor="" className=' font-bold ms-2'>All Document  Link</label> */}

                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                  <ul className=' grid grid-cols-2 gap-2'>
                    <li className='  text-gray-400 text-sm hover:underline'><Link href={insurance.aadharcard} target="_blank" className=' flex gap-2'> <img src={insurance.aadharcard} width={20} height={20}></img>Aadhar Card</Link></li>
                    <li className='  text-gray-400 text-sm hover:underline'><Link href={insurance.pan_card} target="_blank"  className=' flex gap-2'> <img src={insurance.pan_card} width={20} height={20}></img>Pan Card</Link></li>
                    <li className='  text-gray-400 text-sm hover:underline'><Link href={insurance.rc} target="_blank" className=' flex gap-2'> <img src={insurance.rc} width={20} height={20}></img>RC</Link></li>
                    <li className='  text-gray-400 text-sm hover:underline'><Link href={insurance.old_policy} target="_blank" className=' flex gap-2'> <img src={insurance.old_policy} width={20} height={20}></img>Old Policy</Link></li>
                  </ul>
                </div>
              </div>

              <div className="grid items-center justify-center">
                 {insurance.status === false && <span className=" px-4 py-2 items-center rounded-full bg-red-50  text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/20">
                    Pending
                  </span>}
                  {insurance.status === true && <span className=" px-4 py-2 items-center rounded-full bg-green-50  text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                    Approved
                  </span>}
                
              </div>


            </div>

          ))}
        </div>
      </div>
    </>
  );
}
