"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchusers = async () => {
            try {
                const response = await axios.get('/api/user/fetch-all-user');
                if (response.data.success) {
                    setUsers(response.data.users);
                } else {
                    console.error('Error fetching users:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchusers();

    }, []);





    return (
        <>

            <div className="container lg:p-8 mx-auto mt-4 px-4">


                <h1 className=' text-4xl font-bold mb-4'>All User</h1>


                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {users.map(users => (

                        <li key={users._id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate text-sm font-medium text-gray-900">{users.name}</h3>

                                        {users.user_type === 0 &&
                                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500">
                                                User
                                            </span>
                                        }
                                        {users.user_type === 1 &&
                                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">
                                                Admin
                                            </span>
                                        }
                                        {users.user_type === 2 &&
                                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">
                                                Super Admin
                                            </span>
                                        }


                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">{users.email}</p>
                                </div>
                                <Link href={`updateuser/${users._id}`}>
                                    <button className='text-green-600 hover:bg-green-100 rounded-md px-2 py-0.5 transition-all'>Edit</button>
                                </Link>
                            </div>

                        </li>


                    ))}
                </ul>
            </div >









        </>
    )
}
