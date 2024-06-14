"use client"
import React from 'react'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Updateinsurance({ params }) {

    const insuranceid = params.insuranceid

    console.log(insuranceid)

    const router = useRouter();

    const [error, setError] = useState('');
    const [insurance, setInsurance] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchinsurance = async () => {
            try {
                const response = await axios.get(`/api/insurance/find-single-insurance/${insuranceid}`);
                setInsurance(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching insurance:', error);
                setLoading(false);
            }
        };

        fetchinsurance();
    }, [insuranceid]);

    const onValueChange = (e) => {

        setInsurance({ id: insuranceid, ...insurance, [e.target.name]: e.target.value })
    }






    const onUpdate = async (e) => {
        e.preventDefault();


        // API CALL


        try {

            const response = await axios.patch("/api/insurance/update", insurance);


            if (response.status == 200) {

                router.push("/user/dashboard/superadmin/alldata/insurance");

            }


        } catch (error) {
            console.log(error);


        }

    }

    return (
        <>

            <div className=' flex justify-center items-center mt-12'>


                <form action="" className=' flex flex-col border w-2/3 md:w-1/2 p-4 rounded-md shadow'>
                    {insurance.status === false && <span className=" w-fit items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500">
                        Pending
                    </span>}
                    {insurance.status === true && <span className=" w-fit items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500">
                        Approved
                    </span>}
                    <h1 className=' font-medium capitalize text-2xl text-gray-600 mb-4'>{insurance.name}</h1>
                    <label htmlFor="status" className='  text-gray-600 font-medium'>Status </label>
                    <select name="status" className='my-5 focus:border-2 border-gray-300 border-b text-gray-500' id="status" value={insurance.status} onChange={(e) => onValueChange(e)}>

                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                    </select>

                    <button onClick={(e) => onUpdate(e)} className=' bg-blue-500 font-medium py-1 rounded-md hover:bg-blue-400 transition-all text-white'>Update</button>


                </form>

            </div>
        </>
    )
}
