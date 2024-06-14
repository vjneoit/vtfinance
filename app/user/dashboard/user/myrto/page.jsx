"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';


export default function MyRto() {

    const { data: session } = useSession();
    const [userId, setUserId] = useState(null);
    const [rto, setRto] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Introducing loading state
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
        const fetchrto = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`/api/rto/find-rto-userid/${userId}`);
                    // Sort the RTO array by createdAt in descending order
                    const sortedRto = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setRto(sortedRto);
                    setLoading(false); // Set loading to false when data is fetched
                    console.log("rto data fetched successfully");
                } catch (error) {
                    console.error('Error fetching rto:', error);
                }
            }
        };

        fetchrto();

    }, [userId]);

    const filteredRto = rto.filter(item => item.vehicle_no.toLowerCase().includes(searchTerm.toLowerCase()));


    return (
        <>

            <div className=' p-4 text-2xl font-bold text-gray-600'>
                All Rto by {session?.user?.name}
            </div>

            <div className='sm:px-2'>

                <input
                    type="text"
                    placeholder="Search by vehicle number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {loading ? ( // Conditional rendering based on loading state
                     <div className='  w-full  flex justify-center items-center gap-4 flex-col'>

                     <div className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
                     <p className=' font-bold text-2xl text-blue-600'>Please wait...</p>
                 </div>
                ) : (
                    <div className='grid md:grid-cols-3 gap-4'>
                        {filteredRto.map(rto => (
                            <Link href={`singlerto/${rto._id}`} key={rto._id}>
                                <div className='text-white flex justify-evenly font-medium p-2 text-lg bg-gradient-to-br from-white via-blue-500 to-blue-600 rounded-md'>
                                    {rto.vehicle_no}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>

        </>
    )
}
