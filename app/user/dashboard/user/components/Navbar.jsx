"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from "lucide-react";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react'

export default function Navbar() {
    const { data: session } = useSession();
    const [show, setShow] = useState(false);

    const handleshow = () => {
        setShow(!show);
    };


    return (
        <>

            <nav className=' bg-black py-4'>
                <div className="container mx-auto xl:px-8 px-4">
                    <div className="grid grid-cols-4 gap-4 items-center ">
                        <div className="col-span-1">

                            <span className=' text-4xl font-bold text-white'><Link href="/user/dashboard/user">Dashboard</Link></span>
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <ul className={`  ${show ? "" : " lg:translate-x-0 -translate-x-full"} z-50 absolute lg:static h-full md:w-1/2 w-full pt-16 ps-8 lg:ps-0 lg:pt-0 leading-10 left-0 top-0 transition-all lg:flex gap-8   bg-black justify-end`}>
                            <div className=' absolute top-0 right-0 m-4'><button onClick={handleshow} className=' text-2xl lg:hidden block z-50 text-white'>X</button></div>
                                <li className=' hover:underline underline-offset-2 font-medium text-gray-200 hover:text-blue-500 cursor-pointer'><Link href="/user/dashboard/user/myinsurance">My Insurance</Link></li>
                                <li className=' hover:underline underline-offset-2 font-medium text-gray-200 hover:text-blue-500 cursor-pointer'><Link href="/user/dashboard/user/loan">Loan</Link></li>
                                <li className=' hover:underline underline-offset-2 font-medium text-gray-200 hover:text-blue-500 cursor-pointer'><Link href="/user/dashboard/user/insurance">Insurance</Link></li>
                                <li className=' hover:underline underline-offset-2 font-medium text-gray-200 hover:text-blue-500 cursor-pointer'><Link href="">Others</Link></li>
                            </ul>
                            <button onClick={handleshow} className=' lg:hidden block z-40'><Menu className=' text-white' /></button>
                            <button
                                className=' text-white ms-4 bg-red-600 rounded-md px-4'
                                onClick={() => signOut()}>
                                Log out

                            </button>
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}
