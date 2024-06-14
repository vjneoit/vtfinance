"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
export default function UpdateUser({ params }) {
    const userId = params.userId;
    const router = useRouter();

    const [error, setError] = useState('');
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user/find-single-user/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const onValueChange = (e) => {
        setUser({ id: userId, ...user, [e.target.name]: e.target.value });
    }

    const onUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch("/api/user/update", user);
            if (response.status === 200) {
                router.push("/user/dashboard/superadmin/alldata/users");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center mt-12">
            {loading ? (
                <div className=' w-full  flex justify-center items-center gap-4 flex-col'>

                    <div class="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
                    <p className=' font-bold text-2xl text-blue-600'> Please wait...</p>
                </div>
            ) : (
                <form onSubmit={onUpdate} className="flex flex-col border w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg bg-white space-y-6">
                    {user.user_type === 0 && (
                        <span className="self-start bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded-full ring-1 ring-inset ring-blue-500">
                            User
                        </span>
                    )}
                    {user.user_type === 1 && (
                        <span className="self-start bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full ring-1 ring-inset ring-green-500">
                            Admin
                        </span>
                    )}
                    <h1 className="text-2xl font-semibold text-gray-700 capitalize">Name:{user.name}</h1>
                    <div className="text-gray-600">
                        <span className="block font-medium">Email: {user.email}</span>
                        <span className="block font-medium">Mobile Number: {user.mobile_no}</span>
                    </div>
                    <div>
                        <span className=' text-gray-600 font-bold'>Aadhar card</span>
                        <Link href={`${user.aadharcard}`} target="_blank">
                            <Image src={user?.aadharcard} width={200} className=' rounded-md' alt='' height={200}></Image>
                        </Link>
                    </div>




                    <div className="flex flex-col space-y-4">
                        <label htmlFor="user_type" className="text-gray-600 font-medium">User Type</label>
                        <select
                            name="user_type"
                            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="user_type"
                            value={user.user_type}
                            onChange={onValueChange}
                        >
                            <option value="1">Admin</option>
                            <option value="0">User</option>
                        </select>
                        {/* <label htmlFor="status" className="text-gray-600 font-medium">Status</label>
                    <select 
                        name="status" 
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="status" 
                        value={user.status} 
                        onChange={onValueChange}
                    >
                        <option value=""></option>
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                    </select> */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-400 transition-all"
                        >
                            Update
                        </button>
                    </div>
                </form>

            )}
        </div>
    );
}
