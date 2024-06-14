"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

export default function MyLoan() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState(null);
  const [loan, setLoan] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

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
    const fetchLoan = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/loan/fetch-loan-userid/${userId}`);
          setLoan(response.data);
          setIsLoading(false); // Set loading to false when data is fetched
          console.log("Loan data fetched successfully");
        } catch (error) {
          console.error('Error fetching loan:', error);
        }
      }
    };

    fetchLoan();
  }, [userId]);

  const filteredLoans = loan.filter(loan =>
    loan.applicant_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='p-4 text-2xl font-bold text-gray-600'>
        All loans by {session?.user?.name}
      </div>
      <div className="container mx-auto lg:px-4 m-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by applicant name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {isLoading ? (
          <div className=' w-full  flex justify-center items-center gap-4 flex-col'>

            <div class="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
            <p className=' font-bold text-2xl text-blue-600'>Please wait...</p>
          </div>
        ) : (
          <div className='grid md:grid-cols-3 gap-4'>
            {filteredLoans.map(loan => (
              <Link href={`singleloan/${loan._id}`} key={loan._id}>
                <div className='text-white flex justify-evenly font-medium p-2 text-lg bg-gradient-to-br from-white via-blue-500 to-blue-600 rounded-md'>
                  <div className=" flex items-center  gap-4 ">
                    {loan.applicant_name}
                    {loan.status === false && (
                      <span className="px-4 py-2 items-center rounded-full bg-red-50 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/20">
                        Pending
                      </span>
                    )}
                    {loan.status === true && (
                      <span className="px-4 py-2 items-center rounded-full bg-green-50 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                        Approved
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
