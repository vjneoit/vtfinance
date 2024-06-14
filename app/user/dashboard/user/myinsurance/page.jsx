"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

export default function Myinsurance() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [insurance, setInsurance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

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
          // Sort insurance based on createdAt field in descending order
          const sortedInsurance = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setInsurance(sortedInsurance);
          setLoading(false);
          console.log("Insurance data fetched successfully");
        } catch (error) {
          console.error('Error fetching insurance:', error);
        }
      }
    };
  
    fetchinsurance();
  }, [userId]);
  

  // Filtered insurance items based on search query
  const filteredInsurance = insurance.filter(item =>
    item.vehicle_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='p-4 text-2xl font-bold text-gray-600'>
        All insurance by {session?.user?.name}
      </div>
      <div className="container mx-auto lg:px-4 m-4">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by vehicle number or name"
             className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? ( // Show loading indicator if loading is true
          <div className=' w-full  flex justify-center items-center gap-4 flex-col'>

          <div class="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
          <p className=' font-bold text-2xl text-blue-600'>Please wait...</p>
      </div>
        ) : (
          <div className='grid md:grid-cols-3 gap-4'>
            {filteredInsurance.map(insurance => (
              <Link href={`singleinsurance/${insurance._id}`} key={insurance._id}>
                <div className='text-white flex justify-evenly font-medium p-2 text-lg bg-gradient-to-br from-white via-blue-500 to-blue-600 rounded-md'>
                  {`${insurance.name} - ${insurance.vehicle_no} `}
                  {insurance.status === false && (
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-red-600/20">
                      Pending
                    </span>
                  )}
                  {insurance.status === true && (
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-500 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20">
                      Approved
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
