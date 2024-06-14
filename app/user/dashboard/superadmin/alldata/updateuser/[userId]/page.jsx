"use client"
import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UpdateUser({ params }) {

    const userId = params.userId

    console.log(userId)

    const router = useRouter();

    const [error, setError] = useState('');
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const response = await axios.get(`/api/user/find-single-user/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        fetchuser();
    }, [userId]);

    const onValueChange = (e) => {

        setUser({ id: userId, ...user, [e.target.name]: e.target.value })
    }






    const onUpdate = async (e) => {
        e.preventDefault();


        // API CALL


        try {

            const response = await axios.patch("/api/user/update", user);


            if (response.status == 200) {

                router.push("/user/dashboard/superadmin/alldata/users");

            }


        } catch (error) {
            console.log(error);


        }

    }

    return (
        <>

            <div className=' flex justify-center items-center mt-12'>


                <form action="" className=' flex flex-col border w-2/3 md:w-1/2 p-4 rounded-md shadow'>
                    {user.user_type === 0 &&
                        <span className=" w-fit items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500">
                            User
                        </span>
                    }
                    {user.user_type === 1 &&
                        <span className=" w-fit items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">
                            Admin
                        </span>
                    }
                    <h1 className=' font-medium capitalize text-2xl text-gray-600 mb-4'>{user.name}</h1>
                    <label htmlFor="user_type" className=' text-gray-600 font-medium'>User Type</label>
                    <select name="user_type" className='my-5 border-b focus:border-2 border-gray-300  text-gray-500' id="user_type" value={user.user_type} onChange={(e) => onValueChange(e)}>
                        <option value="1">Admin</option>
                        <option value="0">User</option>
                    </select>

                    <label htmlFor="status" className='  text-gray-600 font-medium'>Status</label>
                    <select name="status" className='my-5 focus:border-2 border-gray-300 border-b text-gray-500' id="status" value={user.status} onChange={(e) => onValueChange(e)}>
                        <option value=""></option>
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                    </select>
                    <button onClick={(e) => onUpdate(e)} className=' bg-blue-500 font-medium py-1 rounded-md hover:bg-blue-400 transition-all text-white'>Update</button>


                </form>

            </div>
        </>
    )
}
