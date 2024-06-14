"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/user/fetch-user/alluser');
                if (response.data.success) {
                    const filteredUsers = response.data.data.filter(user => user.user_type === 0);
                    setUsers(filteredUsers);
                } else {
                    console.error('Error fetching users:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false); // Update loading state when fetch is completed
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="container lg:p-8 mx-auto mt-4 px-4">
                <h1 className='text-4xl font-bold mb-4 text-gray-600'>All Users</h1>

                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {isLoading ? ( // Render loading indicator if loading
                     <div className=' w-full  flex justify-center items-center gap-4 flex-col'>

                     <div class="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin"></div>
                     <p className=' font-bold text-2xl text-blue-600'> Please wait...</p>
                   </div>
                ) : (
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredUsers.map(user => (
                            <li key={user._id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                <div className="flex w-full items-center justify-between space-x-6 p-6">
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-sm font-medium text-gray-900">{user.name}</h3>

                                            {user.user_type === 0 &&
                                                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500">
                                                    User
                                                </span>
                                            }
                                            {user.user_type === 1 &&
                                                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">
                                                    Admin
                                                </span>
                                            }
                                            {user.user_type === 2 &&
                                                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">
                                                    Super Admin
                                                </span>
                                            }
                                        </div>
                                        <p className="mt-1 truncate text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <Link href={`updateuser/${user._id}`}>
                                        <button className='text-green-600 hover:bg-green-100 rounded-md px-2 py-0.5 transition-all'>Edit</button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
