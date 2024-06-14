"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from "lucide-react";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react'

export default function Navbar() {
    const { data: session } = useSession();
    const [show, setShow] = useState(false);

    // Handle the toggler state based on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && show) {
                setShow(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [show]);

    const handleToggle = () => {
        setShow(!show);
    };

    const handleLinkClick = () => {
        setShow(false); // Close navbar when a link is clicked
    };


    return (
        <>

            <nav className="bg-gradient-to-br from-blue-200 to-blue-700 py-4">
                <div className="container mx-auto xl:px-8 px-4">
                    <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-1">
                            <span className=' text-4xl font-bold text-white'><Link href="/user/dashboard/admin">Admin</Link></span>
                        </div>
                        <div className="col-span-4 flex justify-end">
                            <ul className={`transition-transform transform ${show ? "translate-x-0 bg-black p-5" : "-translate-x-full"} lg:translate-x-0 z-50 absolute lg:static h-full w-full pt-16 lg:pt-0 leading-10 left-0 top-0 lg:flex gap-8 justify-end lg:bg-transparent`}>
                                <div className=' absolute top-0 right-0 m-4'><button onClick={handleToggle} className=' text-2xl lg:hidden block z-50 text-white'>X</button></div>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/alldata/users">All Users</Link></li>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/alldata/insurance">All Insurance</Link></li>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/alldata/loan">All Loan</Link></li>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/alldata/rto">All Rto</Link></li>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/loan">Loan</Link></li>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/insurance">Insurance</Link></li>
                                <li className='font-medium text-gray-200'><Link onClick={handleLinkClick} className='hover:underline underline-offset-2  cursor-pointer' href="/user/dashboard/admin/rto">Rto</Link></li>
                                <button
                                    className=' md:w-36 text-white ms-4 bg-red-600 rounded-md px-4'
                                    onClick={() => signOut()}>
                                    Log out

                                </button>
                            </ul>
                            <button onClick={handleToggle} className=' lg:hidden block z-40'><Menu className=' text-white' /></button>

                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}
